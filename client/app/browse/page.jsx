import Item from '../../components/Item.jsx'

export default function Browse() {
   return (
      <main>
         <h1>Browse your watchlist</h1>
         {items.map(item => (
            <Item title={data.title} />
         ))}
      </main>
   )
}

//skicka get till min server för att hämta användarens lista från min databas
//denna lista består endast av namnen
//använd sedan namnen för att hämta data från TMDB API
