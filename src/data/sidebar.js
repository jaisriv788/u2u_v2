import { SlDocs, SlScreenDesktop } from "react-icons/sl";
import { IoIosColorPalette } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import {
  FaChartPie,
  FaCircleHalfStroke,
  FaGlobe,
  FaPowerOff,
  FaShapes,
  FaWallet,
} from "react-icons/fa6";
import { GiCash } from "react-icons/gi";

export const sidebarLinkData = [
  { id: 1, title: "Dashboard", icon: SlScreenDesktop, path: "/dashboard" },
  {
    id: 2,
    title: "Authentication",
    icon: IoIosColorPalette,
    subRoute: [
      { id: 21, title: "Profile", icon: GoDotFill, path: "/profile" },
      {
        id: 22,
        title: "Login Password",
        icon: GoDotFill,
        path: "/loginpassword",
      },
    ],
  },
  {
    id: 3,
    title: "Network",
    icon: FaCircleHalfStroke,
    subRoute: [
      { id: 31, title: "My Direct", icon: GoDotFill, path: "/mydirect" },
      { id: 32, title: "Team Network", icon: GoDotFill, path: "/teamnetwork" },
      { id: 33, title: "Level Network", icon: GoDotFill, path: "/levelvolume" },
      { id: 34, title: "Rank Volume", icon: GoDotFill, path: "/rankvolume" },
    ],
  },
  {
    id: 4,
    title: "Income",
    icon: GiCash,
    subRoute: [
      {
        id: 41,
        title: "Daily Delegator Reward",
        icon: GoDotFill,
        path: "/dailydelegatorreward",
      },
      { id: 42, title: "Direct Bonus", icon: GoDotFill, path: "/directbonus" },
      {
        id: 43,
        title: "Delegator Level Bonus",
        icon: GoDotFill,
        path: "/delegatorlevelbonus",
      },
      {
        id: 44,
        title: "Rank & Rewards",
        icon: GoDotFill,
        path: "/rank&reward",
      },
    ],
  },
  {
    id: 5,
    title: "Delegator (Promo Package)",
    icon: FaGlobe,
    subRoute: [
      {
        id: 51,
        title: "Delegator PP activation",
        icon: GoDotFill,
        path: "/delegatorppactivation",
      },
      {
        id: 52,
        title: "Promo PackHistory",
        icon: GoDotFill,
        path: "/promopackhistory",
      },
      {
        id: 53,
        title: "Verification of Node",
        icon: GoDotFill,
        path: "/verificationofnode",
      },
    ],
  },
  {
    id: 6,
    title: "Wallet & Delegator",
    icon: FaWallet,
    subRoute: [
      {
        id: 61,
        title: "Delegate (usdt.bep20)",
        icon: GoDotFill,
        path: "/delegateusdtbep20",
      },
      {
        id: 62,
        title: "Delegator Report",
        icon: GoDotFill,
        path: "/delegatorreport",
      },
      {
        id: 63,
        title: "Deposit Fund",
        icon: GoDotFill,
        path: "/depositefund",
      },
      {
        id: 64,
        title: "Deposit Report",
        icon: GoDotFill,
        path: "/depositerport",
      },
      { id: 65, title: "Withdraw", icon: GoDotFill, path: "/withdraw" },
      {
        id: 66,
        title: "Withdraw Report",
        icon: GoDotFill,
        path: "/withdrawreport",
      },
    ],
  },
  {
    id: 7,
    title: "Web Link",
    icon: FaCircleHalfStroke,
    subRoute: [
      {
        id: 71,
        title: "u2dpn Explorer",
        icon: GoDotFill,
        link: "https://scan.u2dpn.xyz/",
      },
      {
        id: 72,
        title: "u2dpn Docs",
        icon: GoDotFill,
        link: "https://docs.u2dpn.xyz/",
      },
      {
        id: 73,
        title: "Whitepaper",
        icon: GoDotFill,
        link: "https://docs.u2u.xyz/",
      },
      {
        id: 74,
        title: "u2u Solaris Mainnet",
        icon: GoDotFill,
        link: "https://u2uscan.xyz/",
      },
      {
        id: 75,
        title: "Confluence",
        icon: GoDotFill,
        link: "https://u2unetwork.atlassian.net/wiki/external/NjViMzkwYjNmNzY0NDFhZTkwMzgyZWRkODVmNWMxZmY",
      },
    ],
  },
  {
    id: 8,
    title: "Press Report",
    icon: SlDocs,
    subRoute: [
      {
        id: 81,
        title: "International Press",
        icon: GoDotFill,
        link: "https://docs.google.com/spreadsheets/d/18MehxnE72xd3OcPOaTawI5eRHCQeYnGaH7ZB-7UMde4/edit?gid=0#gid=0",
      },
      {
        id: 82,
        title: "Vietnam Press",
        icon: GoDotFill,
        link: "https://docs.google.com/spreadsheets/d/1YBWykk9XpWLOfBO86ExwkaCYhfCl4RNnN_tH3CPS7is/edit?gid=0#gid=0",
      },
    ],
  },
  {
    id: 9,
    title: "Venture",
    icon: FaShapes,
    subRoute: [
      {
        id: 91,
        title: "DD Document",
        icon: GoDotFill,
        link: "https://u2unetwork.atlassian.net/wiki/external/NjViMzkwYjNmNzY0NDFhZTkwMzgyZWRkODVmNWMxZmY",
      },
      {
        id: 92,
        title: "Ecosystem",
        icon: GoDotFill,
        link: "https://u2u.xyz/ecosystem?fbclid=IwY2xjawE1BKBleHRuA2FlbQIxMAABHRvhGx6PoMIBYXwvjcRFCnGSv3dKqnKTtSgM_mG1ZNZa81rn1YaI_wCt1g_aem_19dM7BGnVXva2NMIKhCrAQ",
      },
    ],
  },
  {
    id: 10,
    title: "Event",
    icon: FaChartPie,
    subRoute: [
      {
        id: 101,
        title: "Unicorn Ultra Show",
        icon: GoDotFill,
        link: "https://www.youtube.com/watch?si=cQojkNdXWXS2dAOE&v=g58LrXdM3ic&feature=youtu.be",
      },
      {
        id: 102,
        title: "Networking Event in Asia",
        icon: GoDotFill,
        link: "https://www.youtube.com/watch?si=EswuB8QCXnGEtg8G&v=vf8MoMPBaP0&feature=youtu.be",
      },
    ],
  },
  {
    id: 11,
    title: "Download Pitch Deck",
    icon: FaWallet,
    subRoute: [
      { id: 111, title: "Validator Pitchdeck", icon: GoDotFill, link: "/app/u2u.pdf" },
      { id: 112, title: "UPhone Pitchdeck", icon: GoDotFill, link: "/app/phone.pdf" },
      { id: 113, title: "Node Pitchdeck", icon: GoDotFill, link: "/app/node.pdf" },
    ],
  },
  // { id: 12, title: "Support", icon: BiSupport, path: "/support" },
  { id: 13, title: "Signout", icon: FaPowerOff, signout: true },
];
