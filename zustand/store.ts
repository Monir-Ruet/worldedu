import { create } from 'zustand'

export interface user {
    name: string,
    email: string,
    image: string,
    mobile_number: string,
    createdAt: Date,
    updatedAt: Date,
    isauthenticated: Boolean
}
export const useUserStore = create<user>()((set) => ({
    name: '',
    email: '',
    image: '',
    mobile_number: '',
    createdAt: new Date,
    updatedAt: new Date,
    isauthenticated: false
}))


export interface postEditor {
    title: string,
    editorText: string,
    selectedCategory: string,
    tags: string[]
}
export const useEditorStore = create<postEditor>()((set) => ({
    title: '',
    editorText: '',
    selectedCategory: '',
    tags: []


}))

// export const useStore = create((set) => ({
//     bears: 0,
//     increasePopulation: () => set((state: any) => ({ bears: state.bears + 1 })),
//     removeAllBears: () => set({ bears: 0 }),
// }))