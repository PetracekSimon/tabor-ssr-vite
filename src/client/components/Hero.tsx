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

const Hero = (props: HeroProps) => {
    return <div className="w-full">
        <div className="hero main-hero h-80 w-full text-center flex items-center justify-center" style={{ backgroundImage: `url(${props.background})` }}>
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

export default Hero;