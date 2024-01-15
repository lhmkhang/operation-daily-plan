'use client'
import { Home, Games, SportsEsports, Description, SettingsSuggest } from '@mui/icons-material';

function DynamicIcon({ iconName, size }) {
    const availableIcons = { Home, Games, SportsEsports, Description, SettingsSuggest };
    const IconComponent = availableIcons[iconName];

    return IconComponent ? <IconComponent /> : <Home />;
}

export default DynamicIcon;