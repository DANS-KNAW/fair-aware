import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer aria-labelledby="footer-heading" className="bg-white">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-20 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="grid gap-x-8 sm:grid-cols-3">
          <div className="order-1 grid grid-cols-2 text-gray-600 sm:order-3">
            <ul className="space-y-4">
              <li className="font-medium text-gray-900">Site</li>
              <li className="hover:text-fair_dark_blue-600">
                <Link href={"#"}>About</Link>
              </li>
              <li className="hover:text-fair_dark_blue-600">
                <Link href={"#"}>Contact</Link>
              </li>
              <li className="hover:text-fair_dark_blue-600">
                <Link href={"#"}>Privacy</Link>
              </li>
            </ul>
            <ul className="space-y-4">
              <li className="font-medium text-gray-900">Resources</li>
              <li className="hover:text-fair_dark_blue-600">
                <Link href={"#"}>Documentation</Link>
              </li>
              <li className="hover:text-fair_dark_blue-600">
                <Link href={"#"}>Glossary</Link>
              </li>
              <li className="hover:text-fair_dark_blue-600">
                <Link href={"#"}>Source Code</Link>
              </li>
            </ul>
          </div>
          <div className="order-2 mt-10 sm:order-1 sm:col-span-2 sm:mt-0">
            <div className="flex gap-8">
              <Link
                href={"https://cordis.europa.eu/project/id/831558/reporting"}
                target="_blank"
                className="relative h-8 w-auto"
              >
                <Image
                  src="/eu-flag.png"
                  alt="Cordis Europa Project 831558"
                  width={0}
                  height={0}
                  sizes="100vh"
                  className="h-full w-auto"
                />
              </Link>
              <Link
                href={"https://dans.knaw.nl"}
                target="_blank"
                className="relative h-8 w-auto"
              >
                <Image
                  src="/dans-knaw.svg"
                  alt="KNAW DANS"
                  width={0}
                  height={0}
                  sizes="100vh"
                  className="h-full w-auto"
                />
              </Link>
            </div>
            <p className="mt-8 text-sm text-gray-600">
              <Link
                href={"https://cordis.europa.eu/project/id/831558/reporting"}
                target="_blank"
                className="text-fair_dark_blue-600 hover:underline"
              >
                “Fostering FAIR Data Practices In Europe”
              </Link>{" "}
              has received funding from the European Union’s Horizon 2020
              project call H2020-INFRAEOSC-2018-2020 Grant agreement 831558. The
              content of this document does not represent the opinion of the
              European Union, and the European Union is not responsible for any
              use that might be made of such content.
            </p>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
          <div className="flex space-x-6 md:order-2">
            <Link href={""} className="text-gray-400 hover:text-fair_dark_blue-600">
              <span className="sr-only">LinkedIn</span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                height="200px"
                width="200px"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-6 w-6"
              >
                <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
              </svg>
            </Link>
            <Link href={""} className="text-gray-400 hover:text-fair_dark_blue-600">
              <span className="sr-only">X</span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="200px"
                width="200px"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-6 w-6"
              >
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
              </svg>
            </Link>
            <Link href={""} className="text-gray-400 hover:text-fair_dark_blue-600">
              <span className="sr-only">WatchApp</span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 308 308"
                height="800px"
                width="800px"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-6 w-6"
              >
                <path d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156   c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687   c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887   c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153   c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348   c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802   c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922   c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0   c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458   C233.168,179.508,230.845,178.393,227.904,176.981z" />
                <path d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716   c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396   c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z    M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188   l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677   c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867   C276.546,215.678,222.799,268.994,156.734,268.994z" />
              </svg>
            </Link>
          </div>
          <p className="mt-8 text-xs leading-5 text-gray-500 md:order-1 md:mt-0">
            &copy; Copyright 2024 - FAIRsFAIR
          </p>
        </div>
      </div>
    </footer>
  );
}
