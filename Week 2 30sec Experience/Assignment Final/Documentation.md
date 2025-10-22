# Week 2 30Second Experience

## Lone Samurai and her pet

## Concept and Story

### *Concept & Aim*

I moved on from a tense, time-pressured rescue concept for the week 1 assignment to a wholesome, Studio Ghibli-esque experience. Every scene is designed to evoke a feeling of instant joy, adventure and a little bit of worry; using beautiful backgrounds and visuals to create a completely wholesome and adorable experience. I further wanted to amplify this feeling by adding a delicate, heartfelt accompanying score to perfectly complete the atmosphere.

### *The story*

The young samurai named Tsumu lived happily in her small hut, sharing her space with Kiko, a small spirited calf.

One bright morning, a flash of sapphire butterfly wings danced past the calf’s nose!

With a joyful moo and a clumsy hop, Kiko completely forgot his grazing and charged! Tsumu simply laughed, watching her friendly pet chase the impossible, tiny flutter across the sunny field. A perfect, happy day. The butterfly led him past the familiar fence line and deeper into the woods! Tsumu's concern sparked, and she immediately sprang into a sprint wanting to stop Kiko from getting lost.  

The calf's heavy hooves and the butterfly's sapphire flutter suddenly disappeared from Kiko's sight. The young samurai hurried to keep up with her silly pet and its fluttering guide on a wonderfully unexpected adventure. A tiny spike of worry returned, but the samurai pushed it down, continuing to run forward with unwavering hope. She focused on the feeling of her pet's joy, knowing he couldn't be far.

Her chase led her past a cliff valley, where the trees finally opened into a hidden, sunlit glade. There, Kiko stopped, letting out a soft gasp of relief and delight.

Tsumu hadn't run away; he had simply found a new friend. The calf was beneath a apple tree, his movements playful and gentle, while the butterfly danced effortlessly around his nose. The two creatures were playing together in perfect harmony, a picture of unexpected companionship. Kiko watched them, her worry instantly melting into wholesome happiness—the adventure had only brought them closer to the world's simple magic. 

Kiko approached the happy pair and bent down onto her knees, petting Tsumu's large head. The calf, quickly pacified by her touch, nudged her hand. With the adventure over, the young samurai simply turned and began the walk back to their hut. They were not alone, however. Now with a new friend, the sapphire butterfly followed them like a tiny, faithful companion all the way home.

### Characters

Young Samurai-Tsumu

![alt text](assets/Samurai_SpriteSheet_4.png)

Calf-Kiko 

![alt text](assets/calf1.png)

Butterfly

![alt text](assets/butterfly1.png)

I realised that making a single sprite sheet with both the calf and butterfly in it will work perfectly rather than going the hard route and coding in the two separate sprite animations. This would work because the calf and butterfly are almost together in every scene. 

![alt text](assets/calf10.png)

Links to source -->

The sprite sheets are sourced freely from -

 Samurai -[craftpix.net](https://craftpix.net/freebies/free-shinobi-sprites-pixel-art/).

 Calf - https://craftpix.net/freebies/free-top-down-animals-farm-pixel-art-sprites/?num=2&count=251&sq=animals%20top%20down&pos=7


 Butterfly - https://opengameart.org/content/butterfly


 ### Backgrounds

 For the long scrollable bacground, i made a long canvas of size 11,520px*1080px in photoshop and filled it in using multiple trees, land, mountains, clouds assets from https://craftpix.net/ , careful on which ones to choose and place to suit the story.

 ![alt text](assets/bg.png)

 ![alt text](assets/scenes.png)




## Interactions & Mechanics

### *Character Animation*

The character sprites will be animated continuously.

When a directional input is active, the characters will loop an appropriate movement animation (e.g., a run cycle or a walk cycle).

When no directional input is given, the characters will play an idle animation while remaining centered.


For the character animations, i implemented a single ultility function defined globally which slices the sprite sheet into a 2D array of individual images. Its only job is to cut up a single image into a 2D array of frames, regardless of whether that image is for the Samurai or the Calf. This function is called in the samurai and calf classes. It replaces the need to write the complex nested for loop logic inside both the Samurai constructor and the Calf constructor.

### *Background*

The environment is a single, long, extended background image that defines the entire game route.

User inputs (Left and Right Arrow Keys) will control the horizontal scrolling of this background image, rather than the character's position.

Right Arrow Input: Scrolls the background image to the left, creating the illusion that the character is moving forward/right.

Left Arrow Input: Scrolls the background image to the right, creating the illusion that the character is moving backward/left.

### *Calf escape sequence *

The experience begins by the automatic movement of calf along with butterfly

The Starting Signal: As soon as you press a key to leave the intro screen, the game state changes its mode to "Calf Escaping."

The Fixed Run: While in this mode, the entire background stops scrolling. The Calf's and butterfly sprite is the only thing that moves. The if condition tells the Calf to slide its position across your screen, frame by frame, at a high, constant speed till it goes out of the canvas. This makes it look like the Calf is sprinting away.

The Disappearance: The Calf continues this movement until its sprite goes completely past the right edge of your computer screen. when this happens else condtion is appllied.

The Chase Begins: The moment the Calf is no longer visible on the screen, the gamestate changes and it instantly stops the Calf's movement, locks its final position deep within the distant world, and hands control of the world-scrolling "camera" over to the Samurai.

### *Gaining control back of calf sequence*

Activation Zone: The player is to scroll the background until the Calf's destination is within a 150-pixel window (the activation zone).

The Trigger: The player is to presses the Down Arrow key.

Control Swap: The Calf instantly becomes the character whose movement controls the world.
The Samurai continues to act out the appropriate walking or running motions.
The Calf's animation is automatically translated to match the Samurai's direction (e.g., Samurai walks left, Calf runs left).

### *Attack Error sequence*

if the player tries to attack the calf while in calf controlled phase, a error message is is prompted at the user saying to don't attack the calf. I included this as to show the player does not have that agency, to attack the calf.

### *Game over* 

Once the characters reach back to their starting postion ie a winning condition, a text is prompted to give that feedback of winning.


#### Click the link below to experience the assignment. ->

#### https://aashishishish.github.io/NID_P5JS_AashishAnand/Week%202%2030sec%20Experience/Assignment%20Final/


## Challenges faced while coding

Gaining control of calf sequence was tricky. I couldn't figure out how to tranfer control or rather control both the characters after a trigger. The activation zone was also tricky.
I made a prototype of this interaction with the help of Anshul and gemini(ai) to implement in this final assignment.

The link to the interaction protoytype is given below->

https://aashishishish.github.io/NID_P5JS_AashishAnand/Week%202%2030sec%20Experience/Gametest_Prototype%20with%20AI/


## Feedbacks & improvements

Working with just Functions for the week 1 weekend assignment was tedious. This time i switched to using classes and objects, which made it much easier to handle and made the code cleaner.

Added the butterfly visual in the experience.

Made the calf a little bit bigger visually.
