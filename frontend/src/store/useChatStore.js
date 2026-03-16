import {create} from "zustand";
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";
import {useAuthStore} from "./useAuthStore.js";






export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,
    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
        set({isSoundEnabled: !get().isSoundEnabled});
    },
    setActiveTab: (tab) => set({activeTab: tab}),
    setSelectedUser: (selectedUser) => set({selectedUser}),

    getAllContacts: async () => {
        set({isUsersLoading: true});
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({allContacts: res.data});

        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            set({isUsersLoading: false});
        }
    },
    getMyChatPartners: async () => {
        set({isUsersLoading: true});
        try {
            const res = await axiosInstance.get("/messages/chats");
            set({chats: res.data});

        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            set({isUsersLoading: false});
        }
    },
    getMessagesByUserId: async (UserId) => {
        set({isMessagesLoading: true});
        try {
            const res = await axiosInstance.get(`/messages/${UserId}`);
            set({messages: res.data});
            
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
            
        } finally {
            set({isMessagesLoading: false});
        }
        
    },
    
    sendMessage: async (messageData) => {

        const {selectedUser} = get();
        const {authUser} = useAuthStore.getState();

        const tempId = `temp-${Date.now()}`;

        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,
            receiverId: selectedUser._id,
            text: messageData.text,
            image: messageData.image,
            createdAt: new Date().toISOString(),
            isOptimistic: true, // flag to identify optimistic messages (optional)
        }
        console.log("Optimistic Message Payload:", optimisticMessage);

        // immidiately update the UI by adding the optimistic message

        set((state) => ({messages: [...state.messages, optimisticMessage]}));



        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
            set((state) => ({
                messages: state.messages.map((msg) => msg._id === tempId ? res.data : msg)

            }));
        } catch (error) {

            set((state) => ({messages: state.messages.filter((msg) => msg._id !== tempId)})); // remove the optimistic message on failure
            toast.error(error.response?.data?.message || "Something went wrong.");
            
        }

    },

    subscribeToMessages: () => {
        const {selectedUser, isSoundEnabled} = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {

            console.log("SOCKET EVENT RECEIVED:", newMessage);
            // 1. Safety check from the earlier backend bug
            if (!newMessage) return;


           // 2. Prevent cross-chat bleed: Only add the message if it's from the selected user
            const isMessageSentFromSelectedUser = newMessage.senderId === get().selectedUser._id;
            if(!isMessageSentFromSelectedUser) return;

           set((state) => ({messages: [...state.messages, newMessage]})); 
           
           if(isSoundEnabled) {
            const notificationSound = new Audio("/sounds/notification.mp3");
            notificationSound.currentTime = 0; // reset to start
            notificationSound.play().catch((e) => console.log("Audio play failed", e));
           }
        });
    },

    unsubscribeToMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },
}));