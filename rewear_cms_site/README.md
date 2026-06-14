# ReWear sajt + Decap CMS admin

Ova verzija sajta ima pripremljen admin panel za dodavanje i izmenu oglasa.

## Važno

Admin panel neće raditi ako samo prevučeš ZIP direktno na Netlify kao ručni deploy. Za CMS je potrebno:

1. GitHub nalog
2. GitHub repository sa ovim fajlovima
3. Netlify sajt povezan sa tim GitHub repository-jem
4. Uključen Netlify Identity
5. Uključen Git Gateway

CMS je besplatan, ali mora imati GitHub gde će upisivati izmene.

## Gde je admin?

Kada sajt bude deploy-ovan preko GitHub + Netlify, admin panel se otvara na:

`https://tvoj-domen.rs/admin/`

ili privremeno:

`https://ime-sajta.netlify.app/admin/`

## Kako da uključiš CMS na Netlify

1. Napravi GitHub repository, npr. `rewear-site`.
2. Uploaduj sve fajlove iz ovog foldera u repository.
3. Na Netlify klikni **Add new site → Import an existing project**.
4. Izaberi GitHub i repository `rewear-site`.
5. Deploy settings ostavi prazno:
   - Build command: prazno
   - Publish directory: `/` ili root
6. Kada se sajt objavi, idi u Netlify dashboard.
7. Otvori **Site configuration → Identity** i uključi Identity.
8. Otvori **Services → Git Gateway** i uključi Git Gateway.
9. U Identity delu pozovi svoj email kao admin korisnika.
10. Otvori `/admin/`, uloguj se i dodaj/menjaj oglase.

## Kako se dodaje oglas u adminu

1. Uđi na `/admin/`.
2. Otvori **Katalog → Oglasi**.
3. Klikni na listu oglasa.
4. Dodaj novi oglas.
5. Unesi:
   - Naslov oglasa
   - Brend
   - Kategoriju
   - Veličinu
   - Stanje
   - Cenu
   - Oznaku
   - Sliku
6. Klikni **Save**.
7. Netlify će automatski objaviti novu verziju sajta.

## Gde se čuvaju oglasi?

Oglasi se čuvaju u fajlu:

`content/data/products.json`

Slike se čuvaju u:

`assets/uploads/`

## Email za upite

Email na sajtu je podešen na:

`oglasirewear@gmail.com`

