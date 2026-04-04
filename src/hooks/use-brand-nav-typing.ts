export function useBrandNavTyping({ isActive, activeText, inactiveText }: { isActive: boolean, activeText: string, inactiveText: string }) {
    return isActive ? activeText : inactiveText;
}
