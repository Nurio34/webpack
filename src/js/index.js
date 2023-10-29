import "../assets/styles/style.css";
import generateJoke from "./generateJoke";

generateJoke();

const element = () => {
    const el = document.createElement("div");
    document.body.appendChild(el);

    el.innerHTML = `
        <div class="flex flex-wrap justify-between items-baseline">
            <div class="bg-orange-500 pt-2 pb-3  basis-12  grow" style="max-width : 192px">A</div>
            <div class="bg-blue-500 pt-3 pb-1  basis-12  grow" style="max-width : 192px">B</div>
            <div class="bg-red-500 pt-1 pb-5  basis-12  grow" style="max-width : 192px">C</div>
            <div class="bg-yellow-500 pt-4 pb-4  basis-12  grow" style="max-width : 192px">D</div>
            <div class="bg-purple-500 pt-5 pb-2  basis-12  grow" style="max-width : 192px">E</div>
        </div>
<br>
        <div class="grid grid-cols-4 gap-1 items-baseline ">
            <div class="bg-orange-500 pt-2 pb-3 ">A</div>
            <div class="bg-blue-500 pt-3 pb-1 ">B</div>
            <div class="bg-red-500 pt-1 pb-5 ">C</div>
            <div class="bg-yellow-500 pt-4 pb-4 ">D</div>
            <div class="bg-purple-500 pt-5 pb-2 ">E</div>
            <div class="bg-orange-500 pt-2 pb-3 ">A</div>
            <div class="bg-blue-500 pt-3 pb-1 ">B</div>
            <div class="bg-red-500 pt-1 pb-5 ">C</div>
            <div class="bg-yellow-500 pt-4 pb-4 ">D</div>
            <div class="bg-purple-500 pt-5 pb-2 ">E</div>
        </div>
    `;
};

element();
