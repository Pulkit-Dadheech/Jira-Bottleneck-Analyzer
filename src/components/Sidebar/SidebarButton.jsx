import React from "react";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";

const SidebarButton = (props) => {
    const { sectionName, currentSection,LogoComponent } = props;
    const {activeSection, setActiveSection} = useSidebar();
    const navigate = useNavigate();
    return (
        <button
            className={`flex items-center gap-3 px-2 py-2 text-sm font-semibold transition ${
            activeSection === currentSection
                ? 'border-l-4 border-gray-400 bg-slate-800 text-gray-300'
                : 'hover:cursor-pointer  text-gray-500'
            }`}
            onClick={() => { setActiveSection(currentSection); navigate(`/dashboard/${currentSection}`); }}
        >
            {LogoComponent && <span><LogoComponent/></span>}
            <span>{sectionName}</span>
        </button>
    );
}
export default SidebarButton;