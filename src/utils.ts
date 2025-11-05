export const getMetaTags = (url: string) => {

	//TODO: další meta tagy
	/*
	<meta name="keywords" content="letni, tabor, stan, stanovy, deti, tri, tydny, dlouhy, 2026, dobrodruzstvi, hry, sport, praha, radotin, radlice, kamena, skautsky, skautsky tabor, skautsky stanovy tabor, skautsky letni tabor, skautsky letni stanovy tabor">
	atd... 
	*/

	const baseUrl = "https://www.stanovytabor.cz";
	const commonKeywords = [
		"letní tábor",
		"dětský tábor",
		"letní dětský tábor",
		"stanový tábor",
		"stanový dětský tábor",
		"tábor pro děti",
		"Vysočina tábor",
		"Kamenná tábor",
		"celotáborová hra",
		"skautský tábor",
		"letní prázdniny pro děti"
	].join(", ");

	let title = "Letní stanový tábor";
	let description = "Užijte si 17 dní plných dobrodružství na letním stanovém táboře Kamenná! Děti se mohou těšit na hry, sportovní aktivity a objevování přírody, které jim zanechají nezapomenutelné zážitky. Ideální dětský letní tábor na Vysočině.";
	let linkCanonical = `<link rel="canonical" href="${baseUrl}"/>`;
	let keywords = commonKeywords;
	let ogTitle = title;

	switch (url) {
		case "/":
			title = "Letní stanový dětský tábor Kamenná | Letní tábor pro děti";
			description = "Tradiční letní dětský stanový tábor Kamenná na Vysočině. 17 dní dobrodružství, hry, sport a nové zážitky pro děti 6–15 let. Ideální letní tábor pro děti.";
			linkCanonical = `<link rel="canonical" href="${baseUrl}/"/>`;
			break;

		case "/o-tabore":
			title = "Letní stanový tábor | O táboře";
			description = "Letní dětský stanový tábor Kamenná 2025 – vše o programu, zázemí a vedení. Bezpečný a smysluplný letní tábor pro děti na Vysočině.";
			linkCanonical = `<link rel="canonical" href="${baseUrl}/o-tabore"/>`;
			break;
		case "/o-tabore/etapova-hra":
			title = "Letní stanový tábor | Celotáborová hra";
			description = "Celotáborová etapová hra na dětském letním táboře Kamenná – dobrodružství, spolupráce a rozvoj dovedností v přírodě.";
			linkCanonical = `<link rel="canonical" href="${baseUrl}/o-tabore"/>`;
			break;
		case "/o-tabore/historie":
			title = "Letní stanový tábor | Historie tábora";
			description = "Historie tradičního dětského stanového tábora Kamenná na Vysočině. Desítky let zážitků a prázdninových dobrodružství.";
			linkCanonical = `<link rel="canonical" href="${baseUrl}/o-tabore"/>`;
			break;

		case "/prubeh-tabora":
			title = "Letní stanový tábor | Průběh dětského tábora";
			description = "Průběh dětského letního tábora Kamenná 2025: program, stravování, hygiena a zdraví, doporučená výbava a praktické tipy pro rodiče.";
			linkCanonical = `<link rel="canonical" href="${baseUrl}/prubeh-tabora"/>`;
			break;
		case "/prubeh-tabora/co-nebrat":
			title = "Letní stanový tábor | Co nebrat s sebou";
			description = "Co nebrat na dětský letní stanový tábor? Praktické rady, aby byly prázdniny bezpečné a pohodové.";
			linkCanonical = `<link rel="canonical" href="${baseUrl}/prubeh-tabora"/>`;
			break;
		case "/prubeh-tabora/hygiena-a-zdravi":
			title = "Letní stanový tábor | Hygiena a zdraví";
			description = "Hygiena, zdravotní péče a bezpečí dětí na letním táboře Kamenná. Informace pro rodiče a doporučení před odjezdem.";
			linkCanonical = `<link rel="canonical" href="${baseUrl}/prubeh-tabora"/>`;
			break;

		case "/chci-jet":
			title = "Letní stanový tábor | Jak se přihlásit";
			description = "Chci jet na dětský letní tábor Kamenná: přihláška, termíny, cena a vše, co potřebujete vědět. Tradiční stanový tábor na Vysočině.";
			linkCanonical = `<link rel="canonical" href="${baseUrl}/chci-jet"/>`;
			break;
		case "/chci-jet/vseobecne-informace":
			title = "Letní stanový tábor | Všeobecné informace";
			description = "Všeobecné informace k dětskému stanovému táboru Kamenná – organizace, vybavení a odpovědi na časté dotazy.";
			linkCanonical = `<link rel="canonical" href="${baseUrl}/chci-jet"/>`;
			break;
		case "/chci-jet/seznam-veci":
			title = "Letní stanový tábor | Seznam věcí";
			description = "Seznam věcí na dětský letní tábor – praktický checklist pro pohodový pobyt v přírodě.";
			linkCanonical = `<link rel="canonical" href="${baseUrl}/chci-jet"/>`;
			break;
		case "/chci-jet/prihlaska":
			title = "Letní stanový tábor | Přihláška";
			description = "Přihláška na dětský letní stanový tábor Kamenná. Jednoduché kroky k nezapomenutelným prázdninám.";
			linkCanonical = `<link rel="canonical" href="${baseUrl}/chci-jet"/>`;
			break;
		case "/chci-jet/storno-podminky":
			title = "Letní stanový tábor | Storno podmínky";
			description = "Storno podmínky a organizační informace k dětskému letnímu táboru Kamenná.";
			linkCanonical = `<link rel="canonical" href="${baseUrl}/chci-jet"/>`;
			break;

		case "/galerie":
			title = "Letní stanový tábor | Galerie";
			description = "Fotogalerie dětského letního tábora Kamenná na Vysočině – atmosféra, hry, příroda a přátelství.";
			linkCanonical = `<link rel="canonical" href="${baseUrl}/galerie"/>`;
			break;
		default:
			title = "Letní stanový tábor";
			break;
	}

	ogTitle = title;

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "Letní stanový tábor Kamenná",
		url: baseUrl,
		description,
		logo: `${baseUrl}/favicon-96x96.png`
	};

	return { title, description, linkCanonical, keywords, ogTitle, jsonLd }
}