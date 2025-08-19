export const getMetaTags = (url: string) => {

    //TODO: další meta tagy
    /*
    <meta name="keywords" content="letni, tabor, stan, stanovy, deti, tri, tydny, dlouhy, 2026, dobrodruzstvi, hry, sport, praha, radotin, radlice, kamena, skautsky, skautsky tabor, skautsky stanovy tabor, skautsky letni tabor, skautsky letni stanovy tabor">
    atd... 
    */

    let title = "Letní stanový tábor";
    let description = "Užijte si 19 dní plných dobrodružství na letním stanovém táboře Kamenná! Děti se mohou těšit na hry, sportovní aktivity a objevování přírody, které jim zanechají nezapomenutelné zážitky.";
    let linkCanonical = `<link rel="canonical" href="https://www.stanovytabor.cz"/>`;
    switch (url) {
        case "/":
            title = "Letní stanový tábor ";
            linkCanonical = `<link rel="canonical" href="https://www.stanovytabor.cz/"/>`;
            break;

        case "/o-tabore":
            title = "Letní stanový tábor | O táboře";
            description = "Letní stanový tábor Kamenná 2025 - 19 dní dobrodružství, hry, výlety a nové kamarády pro děti 6-15 let v krásné přírodě Vysočiny.";
            linkCanonical = `<link rel="canonical" href="https://www.stanovytabor.cz/o-tabore"/>`;
            break;
        case "/o-tabore/etapova-hra":
            title = "Letní stanový tábor | O táboře";
            description = "Letní stanový tábor Kamenná 2025 - 19 dní dobrodružství, hry, výlety a nové kamarády pro děti 6-15 let v krásné přírodě Vysočiny.";
            linkCanonical = `<link rel="canonical" href="https://www.stanovytabor.cz/o-tabore"/>`;
            break;
        case "/o-tabore/historie":
            title = "Letní stanový tábor | O táboře";
            description = "Letní stanový tábor Kamenná 2025 - 19 dní dobrodružství, hry, výlety a nové kamarády pro děti 6-15 let v krásné přírodě Vysočiny.";
            linkCanonical = `<link rel="canonical" href="https://www.stanovytabor.cz/o-tabore"/>`;
            break;

        case "/prubeh-tabora":
            title = "Letní stanový tábor | Průběh tábora";
            description = "Stanový tábor Kamenná 2025: kompletní informace o průběhu tábora, stravování, hygieně a zdraví, doporučené výbavě a věcech, které děti na tábor nosit nemají. Praktické tipy pro rodiče a bezpečný pobyt dětí na Vysočině.";
            linkCanonical = `<link rel="canonical" href="https://www.stanovytabor.cz/prubeh-tabora"/>`;
            break;
        case "/prubeh-tabora/co-nebrat":
            title = "Letní stanový tábor | Průběh tábora";
            description = "Stanový tábor Kamenná 2025: kompletní informace o průběhu tábora, stravování, hygieně a zdraví, doporučené výbavě a věcech, které děti na tábor nosit nemají. Praktické tipy pro rodiče a bezpečný pobyt dětí na Vysočině.";
            linkCanonical = `<link rel="canonical" href="https://www.stanovytabor.cz/prubeh-tabora"/>`;
            break;
        case "/prubeh-tabora/hygiena-a-zdravi":
            title = "Letní stanový tábor | Průběh tábora";
            description = "Stanový tábor Kamenná 2025: kompletní informace o průběhu tábora, stravování, hygieně a zdraví, doporučené výbavě a věcech, které děti na tábor nosit nemají. Praktické tipy pro rodiče a bezpečný pobyt dětí na Vysočině.";
            linkCanonical = `<link rel="canonical" href="https://www.stanovytabor.cz/prubeh-tabora"/>`;
            break;

        case "/chci-jet":
            title = "Letní stanový tábor | Chci jet";
            description = "Objevte tradiční stanový tábor na Vysočině pro vaše dítě. Celotáborová hra, ubytování ve stanech a péče zkušených vedoucích. Zjistěte, jak se snadno přihlásit.";
            linkCanonical = `<link rel="canonical" href="https://www.stanovytabor.cz/chci-jet"/>`;
            break;
        case "/chci-jet/vseobecne-informace":
            title = "Letní stanový tábor | Chci jet";
            description = "Objevte tradiční stanový tábor na Vysočině pro vaše dítě. Celotáborová hra, ubytování ve stanech a péče zkušených vedoucích. Zjistěte, jak se snadno přihlásit.";
            linkCanonical = `<link rel="canonical" href="https://www.stanovytabor.cz/chci-jet"/>`;
            break;
        case "/chci-jet/seznam-veci":
            title = "Letní stanový tábor | Chci jet";
            description = "Objevte tradiční stanový tábor na Vysočině pro vaše dítě. Celotáborová hra, ubytování ve stanech a péče zkušených vedoucích. Zjistěte, jak se snadno přihlásit.";
            linkCanonical = `<link rel="canonical" href="https://www.stanovytabor.cz/chci-jet"/>`;
            break;
        case "/chci-jet/prihlaska":
            title = "Letní stanový tábor | Chci jet";
            description = "Objevte tradiční stanový tábor na Vysočině pro vaše dítě. Celotáborová hra, ubytování ve stanech a péče zkušených vedoucích. Zjistěte, jak se snadno přihlásit.";
            linkCanonical = `<link rel="canonical" href="https://www.stanovytabor.cz/chci-jet"/>`;
            break;
        case "/chci-jet/storno-podminky":
            title = "Letní stanový tábor | Chci jet";
            description = "Objevte tradiční stanový tábor na Vysočině pro vaše dítě. Celotáborová hra, ubytování ve stanech a péče zkušených vedoucích. Zjistěte, jak se snadno přihlásit.";
            linkCanonical = `<link rel="canonical" href="https://www.stanovytabor.cz/chci-jet"/>`;
            break;

        case "/galerie":
            title = "Letní stanový tábor | Galerie";
            description = "Prohlédněte si fotky z našeho stanového tábora na Vysočině. Podívejte se, jak opravdový táborový život plný dobrodružství, her a přátelství vypadá.";
            linkCanonical = `<link rel="canonical" href="https://www.stanovytabor.cz/galerie"/>`;
            break;
        default:
            title = "Letní stanový tábor";
            break;
    }

    return { title, description, linkCanonical }
}