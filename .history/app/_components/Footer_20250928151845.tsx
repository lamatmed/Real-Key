import Image from "next/image";

function Footer() {
    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 ">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
                <div className="md:max-w-96">
            <Image alt="image" src="/logoFooter.png" width={150} height={150}/>
                    <p className="mt-6 text-sm">
                        Real Key révolutionne l'expérience immobilière en offrant des services transparents et accessibles. 
                        Notre mission est de vous accompagner dans tous vos projets, de l'achat à la location, 
                        avec expertise et innovation depuis 2015.
                    </p>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-20">
                    <div>
                        <h1 className="font-semibold mb-5 text-gray-800">Entreprise</h1>
                        <ul className="text-sm space-y-2">
                            <li><a href="/">Accueil</a></li>
                            <li><a href="/about">À propos</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/privacy">Politique de confidentialité</a></li>
                        </ul>
                    </div>
                    <div>
                        <h1 className="font-semibold mb-5 text-gray-800">Nous contacter</h1>
                        <div className="text-sm space-y-2">
                            <p>01 23 45 67 89</p>
                            <p>contact@realkey.fr</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center text-xs md:text-sm pb-5">
                Copyright 2024 © <a href="/">Real Key</a>. Tous droits réservés.
            </p>
        </footer>
    );
};
export default Footer