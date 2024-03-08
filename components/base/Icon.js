'use client'
import { Home, Games, SportsEsports, Description, SettingsSuggest, EditNote, DeleteForever,BorderColor, DeleteSweep, Clear, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

function DynamicIcon({ iconName, size }) {
    const availableIcons = { Home, Games, SportsEsports, Description, SettingsSuggest, EditNote, DeleteForever,BorderColor, DeleteSweep, Clear, ArrowBackIos, ArrowForwardIos };
    const IconComponent = availableIcons[iconName];

    return IconComponent ? <IconComponent /> : <Home />;
}

export default DynamicIcon;