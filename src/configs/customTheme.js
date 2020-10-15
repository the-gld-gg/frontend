import React from 'react'
import { theme } from "@chakra-ui/core";

// Let's say you want to add custom colors
const customTheme = {
  ...theme,
  fonts: {
    ...theme.fonts,
    body: "Questrial, sans-serif",
    heading: "Alegreya, serif"
  },
  colors: {
    ...theme.colors,
    brand: {
      900: "#0A154A",
      800: "#EE215B",
      700: "#5A0001",
      600: "#550527",
      500: "#FFFFFF",
      400: "#643173",
      300: "#0098DC",
      200: "#FF7E2E",
      50: "#0A154A"
    },
  },
  icons: {
    ...theme.icons,
    location: {
      path: <path fill="#EC1D51" d="M27.5 4.87502C32.3835 4.87502 36.6667 8.8396 36.6667 13.3588C36.6667 18.0567 32.7388 24.6819 27.5 32.9777C22.2613 24.6819 18.3333 18.0567 18.3333 13.3588C18.3333 8.8396 22.6165 4.87502 27.5 4.87502ZM27.5 0.291687C20.2858 0.291687 13.75 6.14231 13.75 13.3588C13.75 20.5729 19.7129 29.1873 27.5 41.5417C35.2871 29.1873 41.25 20.5729 41.25 13.3588C41.25 6.14231 34.7165 0.291687 27.5 0.291687ZM27.5 18.625C24.9677 18.625 22.9167 16.574 22.9167 14.0417C22.9167 11.5094 24.9677 9.45835 27.5 9.45835C30.0323 9.45835 32.0833 11.5094 32.0833 14.0417C32.0833 16.574 30.0323 18.625 27.5 18.625ZM55 50.7084H0L9.16667 32.375H16.351C17.2333 33.844 18.1798 35.3748 19.1744 36.9584H11.9992L7.41583 46.125H47.5819L42.9985 36.9584H35.8233C36.8202 35.3748 37.7667 33.844 38.6467 32.375H45.8333L55 50.7084Z" />,
      viewBox: "0 0 55 51"
    },
    people: {
      path: <path fill="#EC1D51" d="M20.0046 8.47917C17.36 12.9181 18.5494 20.4577 23.2679 29.1615C25.3992 33.0848 24.8652 36.0823 24.0425 37.9042C21.7921 42.8954 15.6206 44.3185 9.0894 45.8242C4.58856 46.8646 4.87502 47.8179 4.87502 55H0.303145L0.291687 52.156C0.291687 46.381 0.747728 43.0467 7.5746 41.47C15.2861 39.6894 22.9013 38.0944 19.2392 31.3454C8.39273 11.3415 16.1454 0 27.7917 0C35.4023 0 41.4729 4.85146 41.4729 14.1327C41.4729 22.2796 37.0065 29.7917 36.0119 32.0833H31.165C32.0634 28.5633 36.8919 22.0779 36.8919 14.1121C36.8919 2.30313 23.4467 2.68813 20.0046 8.47917ZM50.7084 43.5417H43.8334V36.6667H39.25V43.5417H32.375V48.125H39.25V55H43.8334V48.125H50.7084V43.5417Z" />,
      viewBox: "0 0 51 55"
    },
    time: {
      path: <path fill="#EC1D51" fillRule="evenodd" clip-rule="evenodd" d="M9.75562 13.2852L8.06667 11.5962L11.3094 8.35582L47.2725 44.3189L44.0321 47.5594L42.1712 45.7008C38.5573 48.7166 33.7035 50.7081 27.4977 50.7081C11.6531 50.7081 4.57875 37.6823 4.57875 27.7914C4.57875 22.2869 6.51979 17.236 9.75562 13.2852ZM13.0212 16.5508C10.6035 19.656 9.16208 23.5587 9.16208 27.7914C9.16208 37.8977 17.3892 46.1248 27.4977 46.1248C31.7304 46.1248 35.6308 44.6833 38.7383 42.2679L13.0212 16.5508ZM15.8469 8.05103C19.2592 6.03207 23.2444 4.87248 27.4977 4.87248C40.1637 4.87248 50.419 15.1369 50.419 27.7914C50.419 31.5314 49.4083 35.7275 47.2885 39.495L43.8579 36.0644C45.1229 33.5779 45.8356 30.766 45.8356 27.7914C45.8356 17.6783 37.6085 9.45582 27.4977 9.45582C24.5231 9.45582 21.7112 10.1685 19.2248 11.4312L15.8469 8.05103ZM1.83792 17.9717C0.611875 16.0833 0 13.9108 0 11.7429C0 5.42478 5.11729 0.296026 11.4377 0.296026C13.6102 0.296026 15.7827 0.910193 17.6733 2.13623C10.4042 4.92519 4.62917 10.7048 1.83792 17.9717ZM43.5485 0.291443C41.3783 0.291443 39.2058 0.905609 37.3175 2.13165C44.5821 4.9229 50.3662 10.7002 53.1621 17.9648C54.3858 16.0787 54.9977 13.9085 54.9977 11.7383C54.9977 5.41103 49.8735 0.291443 43.5485 0.291443Z" />,
      viewBox: "0 0 55 51"
    },
    controller: {
      path: <path fill="currentColor" d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />,
      viewBox: "0 0 24 24"
    },
    filter: {
      path: <path fill="currentColor" d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />,
      viewBox: "0 0 24 24"
    },
    trophy: {
      path: <path fill="currentColor" d="M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z" />,
      viewBox: "0 0 576 512"
    },
    info: {
      path: <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />,
      viewBox: "0 0 24 24"
    },
    menu: {
      path: <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />,
      viewBox: "0 0 24 24"
    },
    playstation: {
      path: <path fill="currentColor" d="M570.9 372.3c-11.3 14.2-38.8 24.3-38.8 24.3L327 470.2v-54.3l150.9-53.8c17.1-6.1 19.8-14.8 5.8-19.4-13.9-4.6-39.1-3.3-56.2 2.9L327 381.1v-56.4c23.2-7.8 47.1-13.6 75.7-16.8 40.9-4.5 90.9.6 130.2 15.5 44.2 14 49.2 34.7 38 48.9zm-224.4-92.5v-139c0-16.3-3-31.3-18.3-35.6-11.7-3.8-19 7.1-19 23.4v347.9l-93.8-29.8V32c39.9 7.4 98 24.9 129.2 35.4C424.1 94.7 451 128.7 451 205.2c0 74.5-46 102.8-104.5 74.6zM43.2 410.2c-45.4-12.8-53-39.5-32.3-54.8 19.1-14.2 51.7-24.9 51.7-24.9l134.5-47.8v54.5l-96.8 34.6c-17.1 6.1-19.7 14.8-5.8 19.4 13.9 4.6 39.1 3.3 56.2-2.9l46.4-16.9v48.8c-51.6 9.3-101.4 7.3-153.9-10z" />,
      viewBox: "0 0 576 512"
    },
    pc: {
      path: <path fill="currentColor" d="M528 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h192l-16 48h-72c-13.3 0-24 10.7-24 24s10.7 24 24 24h272c13.3 0 24-10.7 24-24s-10.7-24-24-24h-72l-16-48h192c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h448v288z" />,
      viewBox: "0 0 576 512"
    },
    xbox: {
      path: <path fill="currentColor" d="M369.9 318.2c44.3 54.3 64.7 98.8 54.4 118.7-7.9 15.1-56.7 44.6-92.6 55.9-29.6 9.3-68.4 13.3-100.4 10.2-38.2-3.7-76.9-17.4-110.1-39C93.3 445.8 87 438.3 87 423.4c0-29.9 32.9-82.3 89.2-142.1 32-33.9 76.5-73.7 81.4-72.6 9.4 2.1 84.3 75.1 112.3 109.5zM188.6 143.8c-29.7-26.9-58.1-53.9-86.4-63.4-15.2-5.1-16.3-4.8-28.7 8.1-29.2 30.4-53.5 79.7-60.3 122.4-5.4 34.2-6.1 43.8-4.2 60.5 5.6 50.5 17.3 85.4 40.5 120.9 9.5 14.6 12.1 17.3 9.3 9.9-4.2-11-.3-37.5 9.5-64 14.3-39 53.9-112.9 120.3-194.4zm311.6 63.5C483.3 127.3 432.7 77 425.6 77c-7.3 0-24.2 6.5-36 13.9-23.3 14.5-41 31.4-64.3 52.8C367.7 197 427.5 283.1 448.2 346c6.8 20.7 9.7 41.1 7.4 52.3-1.7 8.5-1.7 8.5 1.4 4.6 6.1-7.7 19.9-31.3 25.4-43.5 7.4-16.2 15-40.2 18.6-58.7 4.3-22.5 3.9-70.8-.8-93.4zM141.3 43C189 40.5 251 77.5 255.6 78.4c.7.1 10.4-4.2 21.6-9.7 63.9-31.1 94-25.8 107.4-25.2-63.9-39.3-152.7-50-233.9-11.7-23.4 11.1-24 11.9-9.4 11.2z" />,
      viewBox: "0 0 512 512"
    },
    steam: {
      path: <path fill="currentColor" d="M496 256c0 137-111.2 248-248.4 248-113.8 0-209.6-76.3-239-180.4l95.2 39.3c6.4 32.1 34.9 56.4 68.9 56.4 39.2 0 71.9-32.4 70.2-73.5l84.5-60.2c52.1 1.3 95.8-40.9 95.8-93.5 0-51.6-42-93.5-93.7-93.5s-93.7 42-93.7 93.5v1.2L176.6 279c-15.5-.9-30.7 3.4-43.5 12.1L0 236.1C10.2 108.4 117.1 8 247.6 8 384.8 8 496 119 496 256zM155.7 384.3l-30.5-12.6a52.79 52.79 0 0 0 27.2 25.8c26.9 11.2 57.8-1.6 69-28.4 5.4-13 5.5-27.3.1-40.3-5.4-13-15.5-23.2-28.5-28.6-12.9-5.4-26.7-5.2-38.9-.6l31.5 13c19.8 8.2 29.2 30.9 20.9 50.7-8.3 19.9-31 29.2-50.8 21zm173.8-129.9c-34.4 0-62.4-28-62.4-62.3s28-62.3 62.4-62.3 62.4 28 62.4 62.3-27.9 62.3-62.4 62.3zm.1-15.6c25.9 0 46.9-21 46.9-46.8 0-25.9-21-46.8-46.9-46.8s-46.9 21-46.9 46.8c.1 25.8 21.1 46.8 46.9 46.8z" />,
      viewBox: "0 0 496 512"
    }
  }
};

export default customTheme;
