import create from 'zustand';

export const [useRoleStore] = create((set) => ({
    findValues: {},
    setFindValues: (values) => set({ findValues: values }),
}));

export const [useButtonStore] = create((set) => ({
    findValues: {},
    setFindValues: (values) => set({ findValues: values }),
}));

export const [useUsersStore] = create((set) => ({
    findValues: {},
    setFindValues: (values) => set({ findValues: values }),
}));

export const [useCategoryStore] = create((set) => ({
    findValues: {},
    setFindValues: (values) => set({ findValues: values }),
}));

export const [useBoardingStore] = create((set) => ({
    findValues: {},
    setFindValues: (values) => set({ findValues: values }),
}));
