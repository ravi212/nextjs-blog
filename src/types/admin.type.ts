type HeaderProps = {
    onClick: (state: boolean) => void;
}

type SideMenuProps = {
    isOpen: boolean; 
    onClose: () => void;
}

type AdminNavItems = {
    id: number,
    title: string,
    link: string,
    icon: any
}