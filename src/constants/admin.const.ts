import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import CategoryIcon from '@mui/icons-material/Category';
import GroupIcon from '@mui/icons-material/Group';

const base = '/admin'

export const ADMIN_NAV_ITEMS = [
    {
        id: 0,
        title: 'Dashboard',
        link: `${base}`,
        icon: SpaceDashboardIcon,
        isOpen: true
    },
    {
        id: 1,
        title: 'Post',
        link: `${base}/post/list`,
        icon: TextSnippetIcon,
        isOpen: true
    },
    {
        id: 1,
        title: 'Category',
        link: `${base}/category/list`,
        icon: CategoryIcon,
        isOpen: false
    },
    {
        id: 1,
        title: 'User',
        link: `${base}/user/list`,
        icon: GroupIcon,
        isOpen: false
    },
]