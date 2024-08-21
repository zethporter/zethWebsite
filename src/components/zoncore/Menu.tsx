import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useZoncore } from "./zoncoreUtils";

const Menu = () => {
  const { resetGame } = useZoncore();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="btn btn-square btn-accent fixed left-10 top-10 z-50 outline-none"
          aria-label="Customise options"
        >
          <Bars3Icon />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        className="menu z-[51] rounded-box border border-base-200 bg-base-100 p-2"
        sideOffset={5}
      >
        <DropdownMenu.Item
          onClick={() => resetGame()}
          className="font-semiboldselect-none btn btn-secondary btn-wide items-center leading-none outline-none data-[disabled]:btn-disabled data-[highlighted]:btn-active"
        >
          Reset
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Menu;
