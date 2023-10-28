import laugh from "../assets/images/laugh.png";
import Joke from "./joke";

const generateJoke = async () => {
    const body = document.querySelector("body");
    body.innerHTML = `
        <div class=" m-3 bg-myClr sm:bg-red-500  md:bg-blue-500 lg:bg-green-500 xl:bg-pink-500 text-white border-4 border-red-500">
        
            p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, corrupti.</p>

            <img id="laughImgEl" alt="" />

            <img id="jokeImgEl" class="joke" />

            <button class="jokeBtn text-3xl font-bold underline">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-5 h-5"
                >
                    <path
                        d="M10 3.75a2 2 0 10-4 0 2 2 0 004 0zM17.25 4.5a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM5 3.75a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM4.25 17a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM17.25 17a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM9 10a.75.75 0 01-.75.75h-5.5a.75.75 0 010-1.5h5.5A.75.75 0 019 10zM17.25 10.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM14 10a2 2 0 10-4 0 2 2 0 004 0zM10 16.25a2 2 0 10-4 0 2 2 0 004 0z"
                    />
                </svg>
            </button>

        </div>
    `;
    const laughImgEl = document.querySelector("#laughImgEl");
    laughImgEl.style = "width: 2rem; aspect-ratio: 1";
    laughImgEl.src = laugh;

    const joke = await Joke();
    const id = joke.id;
    const jokeImgEl = document.querySelector("#jokeImgEl");
    jokeImgEl.src = `https://icanhazdadjoke.com/j/${id}.png`;
    console.log(id);

    const jokeBtn = document.querySelector(".jokeBtn");
    jokeBtn.onclick = generateJoke;
};

export default generateJoke;
