import Image from "next/image"
import style from "./page.module.css"
import {  getMealsDetails } from "@/lib/meals"
import { notFound } from "next/navigation";

export default function MealDetails({params}){
    const meal =  getMealsDetails(params.meal)
    meal.instructions = meal.instructions.replace(/\n/g,"<br/>");
    if(!meal){
        notFound()
    }
    return (
    <>
    <header className={style.header}>
        <div className={style.image}>
            <Image src={meal.image} alt={meal.title} fill/>
        </div>
        <div className={style.headerText}>
            <h1 >{meal.title}</h1>
            <p className={style.creator}>
                <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
            </p>
            <p className={style.summary}>{meal.summary}</p>
        </div>
    </header>

    <main>
        <p className={style.instructions} dangerouslySetInnerHTML={{
            __html:meal.instructions}}>
            
        </p>
    </main>
    </>
    
)}