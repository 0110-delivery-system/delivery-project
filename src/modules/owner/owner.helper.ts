export const isEmailValid = (email: string): boolean => {
    if (typeof email !== 'string') return false;

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    return emailRegex.test(email);
};

export const isPasswordValid = (password: string): boolean => {
    if (typeof password !== 'string') return false;

    if (password.length < 4 || password.length > 12) {
        return false;
    }

    return true;
};

export const isNameValid = (name: string) => {
    if (typeof name !== 'string' || name.length > 5) return false;

    const koreanRegex = /^[가-힣]+$/;

    return koreanRegex.test(name);
};
