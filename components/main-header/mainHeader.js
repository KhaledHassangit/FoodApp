"use client"
import Link from "next/link"
import Logo from "@/assets/logo.png"
import style from "./mainHeader.module.css"
import Image from "next/image"
import { usePathname } from "next/navigation"

const MainHeader = () => {
    const path = usePathname()
    return (
        <header className={style.header}>
            <Link className={style.logo} href="/">
            <Image  src={Logo} alt="Logo Image" priority/>
            NEXTLEVEL Food
            </Link>
            <nav className={style.nav}>
                <ul>
                    <li>
                        <Link href="/meals" 
                        className={path.startsWith("/meals") ? style.active : undefined}>
                            Browse Meals
                        </Link>
                    </li>
                    <li>
                        <Link href="/community" 
                        className={path.startsWith("/community") ? style.active : undefined}>
                        Foodies Community
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainHeader
