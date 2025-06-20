import SidebarButton from "./SidebarButton";
import { useSidebar } from "../../context/SidebarContext";

const Sidebar = (props) => {
  const { titleName, activeSectionList, LogoComponents, sectionNames } = props;
  const { activeSection, setActiveSection } = useSidebar(activeSectionList[0]);

  return (
    <aside className="w-60 min-h-screen bg-white/90 border-r border-slate-200 flex flex-col py-8 px-3 shadow-md">
      {/* Logo and title */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <span className="text-xl"></span>
        <span className="text-xl font-bold text-gray-500">{titleName}</span>
      </div>
      {/* All Components */}
      <nav className="flex flex-col gap-3">
        {sectionNames.map((sectionName, index) => (
          <SidebarButton
            key={index}
            sectionName={sectionName}
            currentSection={activeSectionList[index]}
            LogoComponent={LogoComponents[index] ? LogoComponents[index] : null} // Handle null case for icons
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;