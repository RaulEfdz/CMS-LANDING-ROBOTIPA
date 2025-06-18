import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

export interface MenuItem {
  type: "item" | "separator" | "sub" | "checkbox" | "radio" | "menu";
  label?: string;
  shortcut?: string;
  disabled?: boolean;
  checked?: boolean;
  inset?: boolean;
  value?: string;
  onClick?: () => void;
  items?: MenuItem[];
}

interface MenuBarProps {
  items: MenuItem[];
}

const renderMenuItem = (item: MenuItem, index: number) => {
  switch (item.type) {
    case "item":
      return (
        <MenubarItem
          key={index}
          disabled={item.disabled}
          inset={item.inset}
          onClick={item.onClick}
        >
          {item.label}
          {item.shortcut && <MenubarShortcut>{item.shortcut}</MenubarShortcut>}
        </MenubarItem>
      );
    case "sub":
      return (
        <MenubarSub key={index}>
          <MenubarSubTrigger>{item.label}</MenubarSubTrigger>
          <MenubarSubContent>
            {item.items?.map((subItem, subIndex) =>
              renderMenuItem(subItem, subIndex)
            )}
          </MenubarSubContent>
        </MenubarSub>
      );
    case "separator":
      return <MenubarSeparator key={index} />;
    case "checkbox":
      return (
        <MenubarCheckboxItem
          key={index}
          checked={item.checked}
          onCheckedChange={item.onClick}
        >
          {item.label}
        </MenubarCheckboxItem>
      );
    case "radio":
      return (
        <MenubarRadioItem
          key={index}
          value={item.value || ""}
          onClick={item.onClick}
        >
          {item.label}
        </MenubarRadioItem>
      );

      
    case "menu":
      return (
        <MenubarMenu key={index}>
          <MenubarTrigger className="hover:font-bold cursor-pointer hover:bg-gray-100">{item.label}</MenubarTrigger>
          <MenubarContent>
            {item.items?.map((subItem, subIndex) =>
              renderMenuItem(subItem, subIndex)
            )}
          </MenubarContent>
        </MenubarMenu>
      );
    default:
      return null;
  }
};

export const MenuBar = ({ items }: MenuBarProps) => {
  return (
    <Menubar className="rounded-none border-none shadow-none bg-transparent px-2 hover:bg-accent/50">
      {items.map((item, index) => renderMenuItem(item, index))}
    </Menubar>
  );
};