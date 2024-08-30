import puppeteer from "puppeteer";

const getQuotes = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

  // On this new page:
  // - open the "http://quotes.toscrape.com/" website
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto("https://myanimelist.net/anime/season", {
    waitUntil: "networkidle0",
  });

  //gets all tabs
  const tabs = await page.evaluate(() => {
    document.querySelector(".css-47sehv").click();

    let yearSeasons = document.querySelectorAll(".horiznav_nav>ul>li>a");
    yearSeasons = Array.from(yearSeasons).slice(1, 5);
    return yearSeasons.map((tab) => tab.href);
  });

  await page.goto(tabs[0], {
    waitUntil: "networkidle2",
  });

  const animeList = await page.evaluate(() => {
    function getAnimeValues(HTMLCollection) {
      let animeArray = Array.from(HTMLCollection);
      animeArray = animeArray.map((animes) => {
        let title =
          animes.querySelector(".h2_anime_title").firstChild.innerHTML;
        let subTitle =
          animes.querySelector(".h3_anime_subtitle")?.innerHTML ?? null;
        let releaseDate = animes.querySelector(".info").firstChild.innerHTML;
        let image =
          animes.querySelector(".image").firstChild.firstChild.src ?? null;
        return { title, subTitle, releaseDate, image };
      });
      return animeArray;
    }

    //accept cookies
    //document.querySelector(".css-47sehv").click();

    //get tabs alredy done in previous code
    let yearSeasons = document.querySelectorAll(".horiznav_nav>ul>li>a");
    yearSeasons = Array.from(yearSeasons).slice(1, 5);
    //yearSeasons.map((tab) => tab.baseURI);

    //let tabs = yearSeasons.map((tab) => tab.href);

    let getAnimeColletion = document.getElementsByClassName("seasonal-anime");
    // let list = getAnimeValues(getAnimeColletion);

    const meh = {};
    meh[yearSeasons[0].innerText.replace(" ", "")] = {
      url: yearSeasons[0].href,
      animes: getAnimeValues(getAnimeColletion),
    };

    // let meh = yearSeasons[0].baseURI;

    return meh;
  });

  console.log("quotes ", animeList);

  // await setTimeout(() => browser.close(), 30000);
  // await browser.close();
};

// Start the scraping
getQuotes();
