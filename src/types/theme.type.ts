// Theme Props
type ThemeProviderProps = {
    children: React.ReactNode
}

type ThemeContextProps = {
    theme: string;
    switchThemeTo: (theme: string) => void;
}
