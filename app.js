/* Week 5 Coding Assignment */
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

class Comic {
    constructor(name, issue, year, pub){
        this.name = name; this.issue = issue; this.year = year; this.publisher = pub;
    }
    description(){
        return `${this.name} - Issue # ${this.issue} (${this.year}) [${this.publisher}]`;
    }
}

class Box {
    constructor(label){
        this.label = label;
        this.contents = [];
    }
    addComic(n,i,y,p){
        if (this.contents.length >= 150) {
            throw new Error(`You can't fit any more comics in the box!`);
        } 
        let comic = new Comic(n,i,y,p);
        this.contents.push(comic);
    }
    description(){
        let comicWord = 'Comics';
        if (this.contents.length === 1){
            comicWord = 'Comic';
        }
        return `${this.label} has ${this.contents.length} ${comicWord} in it.`;
    }
}

class ComicCollection {
    constructor(){
        this.boxes = [];
        this.boxSelection = null;
    }
    start(){
        let collectSelect = this.showCollectionOptions();
            switch(collectSelect){
                case '1': this.startBox();
                break;
                case '2': this.viewBox();
                break;
                case '3': this.removeBox();
                break;
                case '4': this.displayBoxes();
                break;
                default: collectSelect = 0;
            }
        }

    showCollectionOptions(){
        readline.question(`
        1 - Start New Comic Box
        2 - View a Comic Box
        3 - Remove a Comic Box
        4 - Display list of current Comic Boxes
        0 - Exit
        `,function(collectSelect){rl.cose();});
    }

    showComicBoxOptions(comicInfo){
        readline.question(`
            0 - Back
            1 - Add Comic
            2 - Remove Comic

            ${comicInfo}
        `);
    }

    startBox(){
        let newBox = readline.question('Enter a label for your New Box of Comics:');
        this.boxes.push(new Box(newBox));
    }

    viewBox(){
        let index = readline.question('Enter the number for the Comic Box you wish to view:');
        if (index > -1 && index < this.boxes.length){
            this.boxSelection = this.boxes[index];
            let boxContents = this.boxSelection.label + '\n';
            
            for (let i = 0; i < this.boxSelection.contents.length; i++){
                boxContents += i + ' - ' + this.boxSelection.contents[i].description() + '\n';
            }
            
            let comicInBoxSelect = this.showComicBoxOptions(boxContents);
            switch(comicInBoxSelect){
                case '1': this.addComicToBox();
                break;
                case '2': this.removeComicFromBox();
            }
        }
    }

    addComicToBox(){
        let name = readline.question('What is the name of the Comic?');
        let issue = readline.question('What issue is it?');
        let year = readline.question('What year did the comic come out?');
        let publisher = readline.question('Who published it?');
        this.boxSelection.addComic(name,issue,year,publisher); //Mention the "push new Class" here.
    }

    removeComicFromBox(){
        let index = prompt('Enter the index of the comic you would like to remove:');
        if (index > -1 && index < this.boxSelection.contents.length){
            this.boxSelection.contents.splice(index, 1);
        }
    }

    displayBoxes(){
        let boxString = '';
        for (let i = 0; i < this.boxes.length; i++){
            boxString += `${i} - ${this.boxes[i].description()}` + '\n';
        }
        alert(boxString);   
    }

    removeBox(){
        let index = prompt('Enter the index of the Boxyou wish to remove:');
        if (index > -1 && index < this.boxes.length){
            this.boxes.splice(index, 1);
        }
    }
}

let start = new ComicCollection();
start.start();