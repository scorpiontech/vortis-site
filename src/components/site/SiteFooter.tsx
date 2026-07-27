import { Link } from "@tanstack/react-router";
import { Instagram, Phone, Mail } from "lucide-react";
import logoAsset from "@/assets/vortis-logo.jpeg.asset.json";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <img src={logoAsset.url} alt="Vortis Gestão" className="h-10 w-10 rounded-lg object-cover" />
            <span className="font-display text-lg font-bold">
              Vortis<span className="text-accent"> Gestão</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Tecnologia, inovação e resultados reais para transformar o seu negócio.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-accent">Navegação</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Início</Link></li>
            <li><Link to="/sobre" className="hover:text-foreground">Sobre</Link></li>
            <li><Link to="/servicos" className="hover:text-foreground">Serviços</Link></li>
            <li><Link to="/contato" className="hover:text-foreground">Contato</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-accent">Fale com a gente</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-accent" />
              <a href="https://wa.me/5591996316518" className="hover:text-foreground">(91) 99631-6518</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-accent" />
              <a href="https://wa.me/5591996127952" className="hover:text-foreground">(91) 99612-7952</a>
            </li>
            <li className="flex items-center gap-2">
              <Instagram className="h-4 w-4 text-accent" />
              <a href="https://instagram.com/vortis.gestao" target="_blank" rel="noreferrer" className="hover:text-foreground">@vortis.gestao</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent" />
              <a href="mailto:contato@vortisgestao.com" className="hover:text-foreground">contato@vortisgestao.com</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Vortis Gestão. Todos os direitos reservados.
      </div>
    </footer>
  );
}
