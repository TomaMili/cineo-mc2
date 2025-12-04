function FooterLanding() {
  return (
    <footer className="w-full pt-10 pb-8 text-center bg-[url(/bg-image.jpg)] bg-cover bg-center text-siva-200 text-xs lg:text-sm">
      <div className="max-w-5xl mx-auto px-4 flex flex-col gap-6 items-center">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 w-full justify-center">
          <div className="space-y-2">
            <p className="text-siva-300 text-[0.7rem] tracking-[0.2em] uppercase">
              Team
            </p>
            <ul className="space-y-1 text-xs lg:text-sm">
              <li>
                <a
                  href="https://www.linkedin.com/in/siljevinackarlo/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-siva-100 transition-colors"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="h-4 w-4 fill-current"
                    viewBox="0 0 448 512"
                  >
                    <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8 0 24.1 24.1 0 53.8 0s53.8 24.1 53.8 53.8c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                  </svg>
                  <span>Karlo Šiljevinac</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/toma-milicevic/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-siva-100 transition-colors"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="h-4 w-4 fill-current"
                    viewBox="0 0 448 512"
                  >
                    <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8 0 24.1 24.1 0 53.8 0s53.8 24.1 53.8 53.8c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                  </svg>
                  <span>Toma Milićević</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/luka-sto%C5%A1i%C4%87-6605a8339/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-siva-100 transition-colors"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="h-4 w-4 fill-current"
                    viewBox="0 0 448 512"
                  >
                    <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8 0 24.1 24.1 0 53.8 0s53.8 24.1 53.8 53.8c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                  </svg>
                  <span>Luka Stošić</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="text-siva-300 text-[0.7rem] tracking-[0.2em] uppercase">
              Cineo
            </p>
            <ul className="space-y-1 text-xs lg:text-sm">
              <li>
                <a
                  href="https://www.facebook.com/cineoapp/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-siva-100 transition-colors"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="h-4 w-4 fill-current"
                    viewBox="0 0 320 512"
                  >
                    <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                  </svg>
                  <span>Facebook · cineoapp</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/cineo_app/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-siva-100 transition-colors"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="h-4 w-4 fill-current"
                    viewBox="0 0 448 512"
                  >
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                  <span>Instagram · cineo_app</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/cineo-app"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-siva-100 transition-colors"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="h-4 w-4 fill-current"
                    viewBox="0 0 448 512"
                  >
                    <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8 0 24.1 24.1 0 53.8 0s53.8 24.1 53.8 53.8c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                  </svg>
                  <span>LinkedIn · cineo-app</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="text-siva-300 text-[0.7rem] tracking-[0.2em] uppercase">
              Contact
            </p>
            <ul className="space-y-1 text-xs lg:text-sm align-middle items-center text-center">
              <li className="flex justify-center mx-auto my-auto">
                <a
                  href="mailto:nope.cineo@gmail.com"
                  className="inline-flex items-center gap-2 hover:text-siva-100 transition-colors"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="h-4 w-4 fill-current"
                    viewBox="0 0 512 512"
                  >
                    <path d="M64 112C28.7 112 0 140.7 0 176c0 11.4 3.1 22.2 8.6 31.4L220.3 329.8c20.7 15.5 50.7 15.5 71.4 0L503.4 207.4c5.5-9.2 8.6-20 8.6-31.4c0-35.3-28.7-64-64-64H64zM512 240.6L339.2 363.8c-38.5 28.8-91.9 28.8-130.4 0L0 240.6V368c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V240.6z" />
                  </svg>
                  <span>nope.cineo@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-[0.7rem] text-siva-400">
          © 2025 Cineo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default FooterLanding;
