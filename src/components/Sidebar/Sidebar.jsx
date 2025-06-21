import SidebarButton from "./SidebarButton";
import { useSidebar } from "../../context/SidebarContext";

const Sidebar = (props) => {
  const { titleName, activeSectionList, LogoComponents, sectionNames } = props;
  const { activeSection, setActiveSection } = useSidebar(activeSectionList[0]);

  return (
    <aside className=" min-h-full bg-black flex flex-col py-8 px-3 shadow-lg">
      {/* Logo and title */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <span className="text-xl"></span>
        <span className="text-xl font-bold text-gray-300">{titleName}</span>
      </div>
      {/* All Components */}
      <nav className="flex flex-col gap-4">
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