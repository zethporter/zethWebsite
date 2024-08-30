import { useSetAtom } from "jotai";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Bars3Icon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useZoncore } from "./zoncoreUtils";

import { themeAtom } from "../../pages/zoncore";

const themes: string[] = [
  "lemonade",
  "nord",
  "retro",
  "valentine",
  "emerald",
  "dracula",
  "dark",
  "coffee",
  "night",
  "forest",
];

const Menu = () => {
  const setTheme = useSetAtom(themeAtom);
  const { resetGame } = useZoncore();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="btn btn-square btn-accent fixed left-10 top-10 z-50 outline-none"
          aria-label="Customise options"
        >
          <Bars3Icon className="h-8 w-8" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        className="menu z-[51] rounded-box border border-base-200 bg-base-100 p-2"
        sideOffset={5}
      >
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger className="flex select-none flex-row items-center justify-between rounded-btn p-2 font-semibold leading-none outline-none data-[disabled]:bg-base-300 data-[highlighted]:bg-base-200">
            Themes
            <div className="h-6 w-6 text-base-content group-data-[disabled]:text-base-content/70 group-data-[highlighted]:text-base-content">
              <ChevronRightIcon />
            </div>
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent
            className="menu z-[52] grid max-w-[60svw] grid-flow-col grid-rows-2 gap-2 overflow-x-auto rounded-box border border-base-200 bg-base-100 p-2"
            sideOffset={8}
            alignOffset={-5}
          >
            {themes.map((theme, i) => (
              <DropdownMenu.Item
                key={i}
                className="data-[highlighted]:ring-none select-none"
                onClick={() => setTheme(theme)}
              >
                <div
                  data-theme={theme}
                  className="grid grid-flow-col grid-rows-2 flex-wrap gap-1 rounded-box bg-base-300 p-2"
                >
                  <div className="aspect-square w-8 rounded-btn bg-primary"></div>
                  <div className="aspect-square w-8 rounded-btn bg-secondary"></div>
                  <div className="aspect-square w-8 rounded-btn bg-accent"></div>
                  <div className="col-start-2 aspect-square w-8 rounded-btn bg-base-100"></div>
                  <div className="aspect-square w-8 rounded-btn bg-base-200"></div>
                </div>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
        <DropdownMenu.Item
          onClick={() => resetGame()}
          className="btn btn-secondary btn-sm btn-wide select-none items-center font-semibold leading-none outline-none data-[disabled]:btn-disabled data-[highlighted]:btn-active"
        >
          Reset
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Menu;
