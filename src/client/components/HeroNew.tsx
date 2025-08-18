
import "./hero.css";
/**
 * Hero component
 * @returns 
 */

interface HeroProps {
    title: string;
    subtitle: string;
    background?: string;
}

const HeroNew = (props: HeroProps) => {
    return <div className="w-full">
        <div className="hero main-hero h-80 w-full text-center flex items-center justify-center" style={{ backgroundImage: `url(${props.background})` }}>

            {/* <picture>
                <source media="(min-width: 2560px)" srcset="/img/hero-2560.webp" type="image/webp" />
                <source media="(min-width: 1920px)" srcset="/img/hero-1920.webp" type="image/webp" />
                <source media="(min-width: 1500px)" srcset="/img/hero-1500.webp" type="image/webp" />
                <source media="(min-width: 1000px)" srcset="/img/hero-1000.webp" type="image/webp" />
                <source media="(min-width: 480px)" srcset="/img/hero-640.webp" type="image/webp" />
                <img src="/img/hero-default.webp" alt="Stanový tábor Kamenná" loading="lazy" />
            </picture> */}
            <div className="hero-content text-light">
                <h1 className="text-6xl font-bold text-butter-cup">{props.title}</h1>
                <p className="text-2xl">
                    {props.subtitle}
                </p>
            </div>
        </div>
        <div className="w-full hero-divider"></div>
    </div>
}

export default HeroNew;