type IconProps = React.HTMLAttributes<SVGElement>;

import { drizzle } from "drizzle-orm/singlestore/driver";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  BarChart2Icon,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  Loader2,
  LucideProps,
  Moon,
  MoreVertical,
  Plus,
  Puzzle,
  Search,
  Settings,
  Users,
  SunMedium,
  PipetteIcon,
  Eye,
  EyeOff,
  Mail,
  KeyIcon,
  Trash,
  User,
  X,
  Heart,
  LucideIcon,
  Box,
  Code2,
  Workflow,
  Shapes,
  Lock,
  Layers,
  CreditCardIcon,
  TestTubeIcon,
  ArrowLeft,
  Icon,
  Network,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  add: Plus,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  billing: CreditCard,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  check: Check,
  close: X,
  key: KeyIcon,
  logs: PipetteIcon,
  ellipsis: MoreVertical,

  gitHub: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="github"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
      ></path>
    </svg>
  ),
  google: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="google"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 488 512"
      {...props}
    >
      <path
        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
        fill="currentColor"
      />
    </svg>
  ),
  help: HelpCircle,
  public: ({ className }: { className: string }) => {
    return <Eye className={className} />;
  },
  private: ({ className }: { className: string }) => {
    return <EyeOff className={className} />;
  },
  email: ({ className }: { className: string }) => {
    return <Mail className={className} />;
  },
  laptop: Laptop,
  users: Users,
  logo: Puzzle,
  media: Image,
  love: Heart,
  moon: Moon,
  page: File,
  post: FileText,
  barchart: BarChart2Icon,
  search: Search,
  settings: Settings,
  spinner: Loader2,
  sun: SunMedium,
  box: Box,
  lock: Lock,
  layers: Layers,
  code2: Code2,
  shapes: Shapes,
  workflow: Workflow,
  test: TestTubeIcon,
  creditCard: CreditCardIcon,
  trash: Trash,
  puzzle: Puzzle,
  network: Network,
  twitter: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="twitter"
      role="img"
      {...props}
    >
      <path
        d="M14.258 10.152L23.176 0h-2.113l-7.747 8.813L7.133 0H0l9.352 13.328L0 23.973h2.113l8.176-9.309 6.531 9.309h7.133zm-2.895 3.293l-.949-1.328L2.875 1.56h3.246l6.086 8.523.945 1.328 7.91 11.078h-3.246zm0 0"
        fill="currentColor"
      />
    </svg>
  ),
  nextjs: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M18.665 21.978A11.94 11.94 0 0 1 12 24C5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251zm-3.332-8.533l1.6 2.061V7.2h-1.6z"
      ></path>
    </svg>
  ),
  typescript: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75q.918 0 1.627.111a6.4 6.4 0 0 1 1.306.34v2.458a4 4 0 0 0-.643-.361a5 5 0 0 0-.717-.26a5.5 5.5 0 0 0-1.426-.2q-.45 0-.819.086a2.1 2.1 0 0 0-.623.242q-.254.156-.393.374a.9.9 0 0 0-.14.49q0 .294.156.529q.156.234.443.444c.287.21.423.276.696.41q.41.203.926.416q.705.296 1.266.628q.561.333.963.753q.402.418.614.957q.213.538.214 1.253q0 .986-.373 1.656a3 3 0 0 1-1.012 1.085a4.4 4.4 0 0 1-1.487.596q-.85.18-1.79.18a10 10 0 0 1-1.84-.164a5.5 5.5 0 0 1-1.512-.493v-2.63a5.03 5.03 0 0 0 3.237 1.2q.5 0 .872-.09q.373-.09.623-.25q.249-.162.373-.38a1.02 1.02 0 0 0-.074-1.089a2.1 2.1 0 0 0-.537-.5a5.6 5.6 0 0 0-.807-.444a28 28 0 0 0-1.007-.436q-1.377-.575-2.053-1.405t-.676-2.005q0-.92.369-1.582q.368-.662 1.004-1.089a4.5 4.5 0 0 1 1.47-.629a7.5 7.5 0 0 1 1.77-.201m-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"
      ></path>
    </svg>
  ),
  tailwind: (props: IconProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"
        fill="currentColor"
      />
    </svg>
  ),
  shadcn: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
      <rect width="256" height="256" fill="none" />
      <line
        x1="208"
        y1="128"
        x2="128"
        y2="208"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <line
        x1="192"
        y1="40"
        x2="40"
        y2="192"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </svg>
  ),
  trpc: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M24 12c0 6.62-5.38 12-12 12S0 18.62 0 12S5.38 0 12 0s12 5.38 12 12M1.21 12A10.78 10.78 0 0 0 12 22.79A10.78 10.78 0 0 0 22.79 12A10.78 10.78 0 0 0 12 1.21A10.78 10.78 0 0 0 1.21 12m10.915-6.086l2.162 1.248a.25.25 0 0 1 .125.217v1.103l2.473 1.428a.25.25 0 0 1 .125.217v2.355l.955.551a.25.25 0 0 1 .125.217v2.496a.25.25 0 0 1-.125.217l-2.162 1.248a.25.25 0 0 1-.25 0l-.956-.552l-2.472 1.427a.25.25 0 0 1-.25 0l-2.472-1.427l-.956.552a.25.25 0 0 1-.25 0l-2.162-1.248a.25.25 0 0 1-.125-.217V13.25a.25.25 0 0 1 .125-.217l.955-.551v-2.355a.25.25 0 0 1 .125-.217l2.473-1.428V7.38a.25.25 0 0 1 .125-.217l2.162-1.248a.25.25 0 0 1 .25 0Zm1.268 10.049a.25.25 0 0 1-.125-.217V13.25a.25.25 0 0 1 .125-.217l2.16-1.248a.25.25 0 0 1 .25 0l.707.408v-1.922l-2.098-1.21v.814a.25.25 0 0 1-.125.217l-2.162 1.248a.25.25 0 0 1-.25 0l-2.162-1.248a.25.25 0 0 1-.125-.217V9.06L7.49 10.271v1.922l.707-.408a.25.25 0 0 1 .25 0l2.16 1.248a.25.25 0 0 1 .125.217v2.496a.25.25 0 0 1-.125.217l-.705.408L12 17.582l2.098-1.211ZM10.088 9.73l1.662.96V8.766l-1.662-.955Zm3.824 0V7.811l-1.662.955v1.924ZM12 6.418l-1.66.96l1.66.954l1.66-.954Zm-5.59 9.184l1.66.958v-1.921l-1.66-.956Zm3.822 0v-1.92l-1.662.957v1.923Zm-1.91-3.311l-1.662.96l1.661.955l1.66-.956Zm5.446 3.31l1.66.96v-1.922l-1.66-.956Zm3.822 0v-1.918l-1.662.956v1.922Zm-1.912-3.31l-1.66.96l1.66.955l1.66-.956Z"
      ></path>
    </svg>
  ),
  drizzle: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M5.353 11.823a1.036 1.036 0 0 0-.395-1.422a1.063 1.063 0 0 0-1.437.399L.138 16.702a1.035 1.035 0 0 0 .395 1.422a1.063 1.063 0 0 0 1.437-.398zm11.216 0a1.036 1.036 0 0 0-.394-1.422a1.064 1.064 0 0 0-1.438.399l-3.382 5.902a1.036 1.036 0 0 0 .394 1.422c.506.283 1.15.104 1.438-.398zm7.293-4.525a1.036 1.036 0 0 0-.395-1.422a1.06 1.06 0 0 0-1.437.399l-3.383 5.902a1.036 1.036 0 0 0 .395 1.422a1.063 1.063 0 0 0 1.437-.399zm-11.219 0a1.035 1.035 0 0 0-.394-1.422a1.064 1.064 0 0 0-1.438.398l-3.382 5.903a1.036 1.036 0 0 0 .394 1.422c.506.282 1.15.104 1.438-.399z"
      ></path>
    </svg>
  ),
  stripe: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409c0-.831.683-1.305 1.901-1.305c2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0C9.667 0 7.589.654 6.104 1.872C4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219c2.585.92 3.445 1.574 3.445 2.583c0 .98-.84 1.545-2.354 1.545c-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813c1.664-1.305 2.525-3.236 2.525-5.732c0-4.128-2.524-5.851-6.594-7.305z"
      ></path>
    </svg>
  ),
  jest: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M22.251 11.82a3.12 3.12 0 0 0-2.328-3.01L22.911 0H8.104L11.1 8.838a3.12 3.12 0 0 0-2.244 2.988a3.12 3.12 0 0 0 1.313 2.536a8.3 8.3 0 0 1-1.084 1.244a8.1 8.1 0 0 1-2.55 1.647c-.834-.563-1.195-1.556-.869-2.446a3.11 3.11 0 0 0-.91-6.08a3.117 3.117 0 0 0-3.113 3.113c0 .848.347 1.626.903 2.182q-.072.144-.146.299c-.465.959-.993 2.043-1.195 3.259c-.403 2.432.257 4.384 1.849 5.489A5.1 5.1 0 0 0 5.999 24c1.827 0 3.682-.917 5.475-1.807c1.279-.632 2.599-1.292 3.898-1.612c.48-.118.98-.187 1.508-.264c1.07-.153 2.175-.312 3.168-.89a4.48 4.48 0 0 0 2.182-3.091c.174-.994 0-1.994-.444-2.87c.298-.48.465-1.042.465-1.647zm-1.355 0c0 .965-.785 1.75-1.75 1.75a1.753 1.753 0 0 1-1.085-3.126l.007-.007q.085-.063.18-.125s.008 0 .008-.007c.028-.014.055-.035.083-.05c.007 0 .014-.006.021-.006q.044-.021.097-.042q.054-.02.098-.041c.007 0 .013-.007.02-.007c.028-.007.056-.021.084-.028c.007 0 .02-.007.028-.007c.034-.007.062-.014.097-.02h.007l.104-.022c.007 0 .02 0 .028-.007c.028 0 .055-.007.083-.007h.035c.035 0 .07-.007.111-.007h.09c.028 0 .05 0 .077.007h.014q.083.009.167.028a1.766 1.766 0 0 1 1.396 1.723zM10.043 1.39h10.93l-2.509 7.4c-.104.02-.208.055-.312.09l-2.64-5.385l-2.648 5.35c-.104-.034-.216-.055-.327-.076zm4.968 9.825a3.1 3.1 0 0 0-.938-1.668l1.438-2.904l1.452 2.967c-.43.43-.743.98-.868 1.605zm-3.481-1.098c.034-.007.062-.014.097-.02h.02c.029-.008.056-.008.084-.015h.028c.028 0 .049-.007.076-.007h.271c.028 0 .049.007.07.007c.014 0 .02 0 .035.007c.027.007.048.007.076.014q.009-.002.028.007l.097.02h.007q.042.01.083.029c.007 0 .014.007.028.007c.021.007.049.014.07.027c.007 0 .014.007.02.007c.028.014.056.021.084.035h.007a.4.4 0 0 1 .09.049h.007c.028.014.056.034.084.048c.007 0 .007.007.013.007c.028.014.05.035.077.049l.007.007c.083.062.16.132.236.201l.007.007a1.75 1.75 0 0 1 .48 1.209a1.752 1.752 0 0 1-3.502 0a1.74 1.74 0 0 1 1.32-1.695m-6.838-.049c.966 0 1.751.786 1.751 1.751s-.785 1.751-1.75 1.751s-1.752-.785-1.752-1.75s.786-1.752 1.751-1.752m16.163 6.025a3.07 3.07 0 0 1-1.508 2.133c-.758.438-1.689.577-2.669.716a17 17 0 0 0-1.64.291c-1.445.355-2.834 1.05-4.182 1.717c-1.724.854-3.35 1.66-4.857 1.66a3.65 3.65 0 0 1-2.154-.688c-1.529-1.056-1.453-3.036-1.272-4.12c.167-1.015.632-1.966 1.077-2.877c.028-.055.049-.104.077-.16q.228.084.479.126c-.264 1.473.486 2.994 1.946 3.745l.264.139l.284-.104c1.216-.431 2.342-1.133 3.336-2.071a9.3 9.3 0 0 0 1.445-1.716c.16.027.32.034.48.034a3.12 3.12 0 0 0 3.008-2.327h1.167a3.11 3.11 0 0 0 3.01 2.327c.576 0 1.11-.16 1.57-.43c.18.52.236 1.063.139 1.605"
      ></path>
    </svg>
  ),
  cypress: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M11.998.02c-.864 0-1.682.11-2.144.193v.002A11.93 11.93 0 0 0 0 12.002c0 1.126.157 2.233.465 3.303c.038.145.091.299.137.447c1.607 4.865 6.224 8.226 11.392 8.228c.065 0 .252 0 .502-.011a2.22 2.22 0 0 0 1.951-1.37l.474-1.154l5.505-13.402H18.62l-2.316 5.871l-2.334-5.871h-1.909l3.274 8.012l-2.436 5.91a.54.54 0 0 1-.472.336c-.144.005-.285.01-.432.01c-4.585 0-8.667-3.07-9.928-7.465a10.3 10.3 0 0 1-.398-2.844a10.27 10.27 0 0 1 8.603-10.164c.222-.037.889-.145 1.725-.145c4.417 0 8.269 2.732 9.73 6.848c.056.144.098.293.147.44c.299.974.453 1.988.453 3.021a10.25 10.25 0 0 1-7.316 9.861l.486 1.6c5.085-1.546 8.5-6.152 8.502-11.46c0-1.548-.298-2.87-.65-3.892l-.131-.363h-.002C21.457 3.095 17.044.02 11.998.02M8.434 7.89c-1.2 0-2.175.386-2.98 1.176c-.802.786-1.206 1.774-1.206 2.936c0 1.154.407 2.137 1.205 2.92c.806.79 1.78 1.174 2.98 1.174c1.706 0 3.156-.955 3.788-2.489l.033-.082l-1.629-.554c-.168.456-.755 1.488-2.191 1.488c-.675 0-1.244-.234-1.694-.7c-.457-.47-.687-1.062-.687-1.757c0-.7.225-1.28.687-1.773c.452-.465 1.02-.702 1.694-.702c1.438 0 2.023 1.082 2.193 1.489l1.627-.553l-.033-.084c-.63-1.536-2.082-2.488-3.787-2.488"
      ></path>
    </svg>
  ),

  user: User,
  warning: AlertTriangle,
};
