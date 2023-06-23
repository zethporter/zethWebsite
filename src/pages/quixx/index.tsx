import react, { useEffect, useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { setCookie, getCookie, hasCookie } from "cookies-next";

import {
  RocketLaunchIcon,
  CheckIcon,
  FireIcon,
  HeartIcon,
  PaperAirplaneIcon,
  TrophyIcon,
  XCircleIcon,
  XMarkIcon,
  TruckIcon,
  StarIcon,
  CpuChipIcon,
  BugAntIcon,
  BoltIcon,
  BeakerIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";

import NumberBox from "../../components/quixx/NumberBox";
import Score from "../../components/quixx/Score";
import IconModal from "../../components/quixx/IconModal";
import { main } from "../../components/quixx/games";

const colors = {
  Cyan: "text-cyan-500",
  Purple: "text-purple-500",
  Pink: "text-purple-500",
  Yellow: "text-amber-500",
  Primary: "text-primary",
  Secondary: "text-secondary",
  Accent: "text-accent",
  Info: "text-info-content",
  Success: "text-success-content",
  Warning: "text-warning-content",
  Error: "text-error-content",
};

const icons = {
  RocketLaunchIcon: RocketLaunchIcon,
  CheckIcon: CheckIcon,
  FireIcon: FireIcon,
  HeartIcon: HeartIcon,
  PaperAirplaneIcon: PaperAirplaneIcon,
  TrophyIcon: TrophyIcon,
  XCircleIcon: XCircleIcon,
  XMarkIcon: XMarkIcon,
  TruckIcon: TruckIcon,
  StarIcon: StarIcon,
  CpuChipIcon: CpuChipIcon,
  BugAntIcon: BugAntIcon,
  BoltIcon: BoltIcon,
  BeakerIcon: BeakerIcon,
  AcademicCapIcon: AcademicCapIcon,
};

const makeIcon = (icon: any, classString: any) => {
  return react.createElement(icons[icon as keyof typeof icons], {
    className: colors[classString as keyof typeof colors],
  });
};

const Home: NextPage = () => {
  const [marker, setMarker] = useState(<FireIcon className="text-primary" />);
  const [markerInfo, setMarkerInfo] = useState({
    icon: hasCookie("icon") ? getCookie("icon") : "FireIcon",
    color: hasCookie("color") ? getCookie("color") : "Accent",
  });
  const [selected, setSelected] = useState<number[]>([]);
  const [negatives, setNegatives] = useState<string[]>([]);
  const [gameInfo, setGameInfo] = useState(main);

  const handleNegativeCheck = (value: string) => {
    negatives.includes(value)
      ? setNegatives(negatives.filter((negative) => negative !== value))
      : setNegatives([...negatives, value]);
  };

  useEffect(() => {
    setCookie("icon", markerInfo.icon);
    setCookie("color", markerInfo.color);
    setMarker(makeIcon(markerInfo.icon, markerInfo.color));
  }, [markerInfo]);

  useEffect(() => {
    const tempInfo = gameInfo.map((item) => {
      if (selected.includes(item.id)) {
        return { ...item, selected: true };
      } else {
        return { ...item, selected: false };
      }
    });
    setGameInfo(tempInfo);
  }, [selected]);

  const disabledCheck = (id: number, row: number) => {
    let disabled = false;
    const rowValues = gameInfo.filter(
      (item) => item.row === row && item.id > id
    );
    rowValues.forEach((item) => {
      if (item.selected === true) {
        disabled = true;
      }
    });
    return disabled;
  };

  const handleBoxClick = (id: number) => {
    const tempSelected = selected.includes(id)
      ? selected.filter((item) => item !== id)
      : [...selected, id];
    setSelected(tempSelected);
  };

  return (
    <>
      <Head>
        <title>Zeth | Quixx</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="sm:min-w-screen m-0 h-full min-h-screen w-full min-w-fit flex-col bg-base-300 p-3 sm:h-full sm:min-h-screen sm:w-full">
        <div className="my-auto mx-auto w-fit rounded bg-base-200 p-5">
          <div className="flex flex-col gap-0 overflow-x-auto rounded bg-base-100 p-5">
            <div className="flex flex-row gap-0">
              {gameInfo
                .filter((box) => box.row === 1)
                .map((item, i) => (
                  <div
                    className={
                      i === 10
                        ? "rounded-tl-xl border-l-2 border-t-2 border-slate-900 p-1"
                        : i === 11
                        ? "rounded-tr-xl border-r-2 border-t-2 border-slate-900 p-1"
                        : "p-1"
                    }
                    key={item.id}
                  >
                    <NumberBox
                      disabled={
                        disabledCheck(item.id, item.row) &&
                        item.selected === false
                      }
                      key={item.id}
                      color={item.color}
                      number={item.num}
                      selected={item.selected}
                      icon={marker}
                      onClick={() => handleBoxClick(item.id)}
                    />
                  </div>
                ))}
            </div>
            <div className="flex flex-row gap-0">
              {gameInfo
                .filter((box) => box.row === 2)
                .map((item, i) => (
                  <div
                    className={
                      i === 10
                        ? "border-l-2 border-slate-900 p-1"
                        : i === 11
                        ? "border-r-2 border-slate-900 p-1"
                        : "p-1"
                    }
                    key={item.id}
                  >
                    <NumberBox
                      disabled={
                        disabledCheck(item.id, item.row) &&
                        item.selected === false
                      }
                      color={item.color}
                      number={item.num}
                      selected={item.selected}
                      icon={marker}
                      onClick={() => handleBoxClick(item.id)}
                    />
                  </div>
                ))}
            </div>
            <div className="flex flex-row gap-0">
              {gameInfo
                .filter((box) => box.row === 3)
                .map((item, i) => (
                  <div
                    className={
                      i === 10
                        ? "border-l-2 border-slate-900 p-1"
                        : i === 11
                        ? "border-r-2 border-slate-900 p-1"
                        : "p-1"
                    }
                    key={item.id}
                  >
                    <NumberBox
                      disabled={
                        disabledCheck(item.id, item.row) &&
                        item.selected === false
                      }
                      color={item.color}
                      number={item.num}
                      selected={item.selected}
                      icon={marker}
                      onClick={() => handleBoxClick(item.id)}
                    />
                  </div>
                ))}
            </div>
            <div className="flex flex-row gap-0">
              {gameInfo
                .filter((box) => box.row === 4)
                .map((item, i) => (
                  <div
                    className={
                      i === 10
                        ? "rounded-bl-xl border-l-2 border-b-2 border-slate-900 p-1"
                        : i === 11
                        ? "rounded-br-xl border-r-2 border-b-2 border-slate-900 p-1"
                        : "p-1"
                    }
                    key={item.id}
                  >
                    <NumberBox
                      disabled={
                        disabledCheck(item.id, item.row) &&
                        item.selected === false
                      }
                      color={item.color}
                      number={item.num}
                      selected={item.selected}
                      icon={marker}
                      onClick={() => handleBoxClick(item.id)}
                    />
                  </div>
                ))}
            </div>
            <div className="m-2 flex justify-between p-1">
              <Score
                scores={{
                  first: gameInfo.filter(
                    (item) => item.row === 1 && item.selected === true
                  ).length,
                  second: gameInfo.filter(
                    (item) => item.row === 2 && item.selected === true
                  ).length,
                  third: gameInfo.filter(
                    (item) => item.row === 3 && item.selected === true
                  ).length,
                  fourth: gameInfo.filter(
                    (item) => item.row === 4 && item.selected === true
                  ).length,
                  negative: negatives.length,
                }}
              />
              <div className="col-span-4 flex flex-row gap-2 rounded-xl border-2 border-slate-600 px-3 py-5">
                <input
                  value={"first"}
                  onChange={(e) => handleNegativeCheck(e.target.value)}
                  type="checkbox"
                  className="h-8 w-8 cursor-pointer rounded text-purple-400 focus:ring-purple-200"
                />
                <input
                  value={"second"}
                  onChange={(e) => handleNegativeCheck(e.target.value)}
                  type="checkbox"
                  className="h-8 w-8 cursor-pointer rounded text-purple-400 focus:ring-purple-200"
                />
                <input
                  value={"third"}
                  onChange={(e) => handleNegativeCheck(e.target.value)}
                  type="checkbox"
                  className="h-8 w-8 cursor-pointer rounded text-purple-400 focus:ring-purple-200"
                />
                <input
                  value={"fourth"}
                  onChange={(e) => handleNegativeCheck(e.target.value)}
                  type="checkbox"
                  className="h-8 w-8 cursor-pointer rounded text-purple-400 focus:ring-purple-200"
                />
                <svg className="h-8 w-8 stroke-purple-400 stroke-2">
                  <CheckIcon />
                </svg>
                <p className="text-3xl">= -5</p>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-3 flex gap-3 rounded bg-base-100 p-5">
            <select
              defaultValue={"text-cyan-500"}
              className="select-secondary select grow focus:border-transparent focus:ring-0"
              onChange={(e) =>
                setMarkerInfo({
                  ...markerInfo,
                  color: e.target.value,
                })
              }
            >
              {Object.keys(colors).map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
            <select
              className="select-secondary select grow focus:border-transparent focus:ring-0"
              onChange={(e) =>
                setMarkerInfo({
                  ...markerInfo,
                  icon: e.target.value,
                })
              }
            >
              {Object.keys(icons).map((icon) => (
                <option key={icon} value={icon}>
                  {icon.slice(0, icon.length - 4)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
