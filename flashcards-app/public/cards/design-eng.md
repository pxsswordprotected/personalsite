Q: What pattern uses a shared literal field to let TypeScript automatically narrow an object's type?
A: Discriminated unions.
ID: 1775666045501


Q: What is the main problem with using loosely typed optional fields to represent an object that can be either a success or an error?
A: The TypeScript compiler cannot automatically prevent accidental access to properties that do not exist in the current state.
ID: 1775666045513


Q: What two requirements must a field meet to function as a "discriminant" in a TypeScript union?
A: It must exist on every branch of the union and have a specific literal value in each branch.
ID: 1775666045519


Q: What does the TypeScript "type" keyword create?
A: It creates a type alias, which is purely a label for the compiler and creates nothing at runtime.
ID: 1775666045525


Q: For what type of data should the `tabular-nums` OpenType feature be the default? in css
A: Any number that updates, such as timers, counters, prices, percentages, scores, and live data.
ID: 1775666045530


Q: What is the exact CSS declaration to apply tabular numbers to an element?
A: `font-variant-numeric: tabular-nums;`
ID: 1775666045536


Q: in TS, what does an interface act as
A: an interface acts as a structural blueprint that defines the specific shape and expected types of an object.
ID: 1775666045543


Q: what is the strict naming convention for interfaces, types, and classes in TS
A: Capitalizing the first letter
ID: 1775666045549


Q: what does `React.ComponentProps<"button">` do? and one use?
A: automatically grabs all the attributes and event listeners from a standard button. one use is extending a TS interface using this line of code.
ID: 1775666045555


Q: The colon `:` in TypeScript translates roughly to what
A: "is of type" or "follows the rules of."
ID: 1775666045560


Q: The colon syntax is the fundamental way to do what in TS
A: to assign types in TypeScript
ID: 1775666045566


Q: what does it mean for an interface in TS to be edited later on?
A: In TypeScript, this means an interface can be reopened and expanded after it is initially created.
ID: 1775666045571


Q: interfaces apply to what data in TS
A: mainly objects or classes
ID: 1775666045576


Q: main difference in type vs interface in TS
A: A `type` acts as a highly versatile custom label maker. While a blueprint (interface) only makes sense for buildings, a label can be stuck onto anything. It can describe a complex object, a simple number, or a specific list of allowed words.
ID: 1775666045582


Q: after a type in TS is defined, can it be edited later on?
A: no. If a different label is needed, a completely new one must be created.
ID: 1775666045587


Q: A `type` is required when creating a "blank," and what's that do
A: when creating a "union," which dictates that a value can be one thing OR another, such as `"active" | "inactive"`.
ID: 1775666045592


Q: can an interface represent a union?
A: no
ID: 1775666045598


Q: If the same interface is declared twice in a project, TypeScript will do what
A: will automatically merge the properties of both declarations together.
ID: 1775666045603


Q: in TS, what tool is used to combine types?
A: The ampersand `&` is the tool used to combine types. In TypeScript terminology, this is called an intersection.
ID: 1775666045609


Q: the `extends` keyword in interfaces kind of acts like what else for types in TS?
A:  The intersection,   `&`
ID: 1775666045614


Q: in TS can interfaces use | or &  ?
A: they can be used inside the interface with proprties
ID: 1775666045620


Q: in react Motion, When a piece of text changes from "1" to "2", `<AnimatePresence>` does what to the "1"
A: it keeps the 1 in the DOM so it can play its exit animation. once the animation finishes, it removes the 1 from the DOM.
ID: 1775666045626


Q: in react, how does updating a number usually work with state (3 parts)
A: Every time that state changes, React recalculates the entire component in memory, compares the new version to the old one, and then updates the actual browser screen.
ID: 1775666045631


Q: how does react Motion use `MotionValue` to bypass slow rendering?
A: When a number increments, Framer Motion bypasses React, reaches directly into the browser's HTML using standard JavaScript, and updates the text node itself
ID: 1775666045637


Q: when a value state changes in react will the screen update?
A: no unless something like the parent is forcing the update
ID: 1775666045642


 Q: The colon in TypeScript is what and read as what
 A: the **type annotation** operator. It simply translates to "is of type".

Q: proper way to type annotate a destructed object in TS
A: `({prop}: {prop: number})`   2nd part should match shape of object
ID: 1775666045648


Q: In TS, when a colon is placed after the closing parenthesis of the argument list, what does that mean
A: it defines the return type of the entire function
ID: 1775666045653


Q: what does `useTransform` do in motion?
A: takes a motion value and applies a transform function to it like `useTransform(xpValue, (v) => v*0.1);` and returns a new motion value 
ID: 1775666045659


Q: what does `useMotionTemplate` do in motion
A: creates a new motion value from a string template contain other motion valuyes like `const x = useMotionTemplate transform(${x}px)`  u need backticks between transform and its end
ID: 1775666045665


Q: MotionValues bypass what in motion? and do what instead?
A: bypass the React render cycle completely. They inject updated numbers directly into the browser DOM 60 times a second, preventing lag
ID: 1775666045670


Q: how can u createe a raw motion value of 100?
A: `const x = useMotionValue(100);`
ID: 1775666045676


Q: how does useRef differ from useState?
A: the variable using ref does not force a re-render if the value changes
ID: 1775666045682


Q: what does `ReturnType<...>` do in TS?
A: reaches in the blueprint and only grabs the specific data type that the function spits out on return
ID: 1775666045687


Q: what does `typeof xxx` do in TS?
A: finds xxx's blueprint like its arguments and return type
ID: 1775666045693


Q: analogy for `useRef` and `current`
A: `useRef` is like a box that is persistent throughout re-renders and `refName.current` is simply a way to access the value inside that box. refName is the name of the label of the box. 
ID: 1775666045698


Q: basic motion `animate` syntax
A: `animate(subject, destination, options)`
ID: 1775666045704


Q: when `animate()` is called in motion, it returns what? and acts as what?
A: a animation control object. it acts as a promise.
ID: 1775666045709


Q: because `animate` in motion returns a promise, what can u use and when?
A: u can use `.then()` that will happen once the animation reaches its destination
ID: 1775666045715


Q: what does the `restDelta` property do in the options portion of `animate` in motion?
A: **`restDelta: <number>`:** Determines exactly how small the final microscopic bounces need to be before the engine officially declares the animation "finished".
ID: 1775666045721


Q: what if `useEffect` has a return statement?
A: it's used as a saved clean up function for later. 
ID: 1775666045726


Q: `restDelta vs restSpeed`
A: While `restDelta` looks at distance, `restSpeed` looks strictly at velocity. It dictates exactly how slow the animated element must be moving before the engine considers it officially stopped.
ID: 1775666045732


Q: when using `<motion.div animate={{ ... }}>`, the `<motion.div>` , is what
A: the motion.div is the subject itself
ID: 1775666045737


Q: what is the strength of  `<AnimatePresence>`  in react motion?
A: gives access to the `exit={{}} ` prop to animate on exit
ID: 1775666045742


Q: process of `<AnimatePresence>`
A: acts as a temp pause button so the HTML does not get instantly deleted by react on exit. first plays the instruction in the `exit={{}}` instructions
ID: 1775666045748


Q: when using `<AnimatePresence>` what do u need on an element so the exit animation plays?
A: a `key` attribute
ID: 1775666045753


Q: what does `tabular-nums` do
A: prevents the entire text block from rapidly jittering back and forth horizontally as the counter quickly ticks up.
ID: 1775666045758


Q: when using `<AnimatePresence>`  what element must be inside for it to work?
A: motion elements like `motion.div` . reg HTML elements are destroyed instantly 
ID: 1775666045763

Q: when using `<AnimatePresence>` what is the point of using popLayout?
A: it yanks elements out of the layout flow instantly by setting position to absolute. siblings can reflow during during the exit instead of after (reduces lag of positioning exit siblings)

Q: when using `popLayout` when would you change the logic or redesign the animation and why?
A: when the element that is exiting is not fading opacity since its siblings could clash and it would look jumbled together. 

Q: when does react motion read the `animate` attribute on something like a `motion.div`
A: as soon as it is written to HTML
ID: 1775666045769


Q: what if a `transition` object is inside an `animate` in a `motion.div`
A: When a `transition` object is nested directly inside `animate`, it tells the engine: "When fading in, ignore the default rules and use these instead."
ID: 1775666045774


Q: what is `\u00A0` used for?
A: it renders a bank Unicode character, typically used for rendering spaces since HTML likes to cut the width on spaces to 0
ID: 1775666045780


Q: The official CSS rules dictate that physical movement properties (like scaling, rotating, or sliding using the `transform` property) cannot be applied to what
A: to standard inline elements like spans
ID: 1775666045785


Q: how would i animate a inline element like `<span>` to slide?
A: applying the `display: inline-block` property to the span
ID: 1775666045791


Q: T/F: React  is completely blind to the physical screen. It has no idea if a `<div>` ended up being 10 pixels wide or 1000 pixels wide once the browser actually painted it on the monitor.
A: TRUE
ID: 1775666045796


Q: how can you delay the moment `animate` happens after `initial` appears from a motion element?
A: using the `delay` property inside a `transition` object
ID: 1775666045801


Q: `ref={ref}` acts as what
A: acts exactly like plugging a physical measuring tape into a specific HTML box so the code can read its real-world size.
ID: 1775666045807


Q: Animation duration should not be more than WHAT LENGTH for interactions to feel immediate
A: 200ms
ID: 1775666045812


Q: what is the `setTimeout(..., 0)` trick?
A: it tells the browser the stuff in the timeout should go to the back of the Event Loop Task Queue  as to not interrupt the current actions of the browser
ID: 1775666045818


Q: is `clip-path` hardware accelerated?
A: yes
ID: 1775666045824


Q: when should you use `ref={ref}` on an element in react?
A: If the code needs to physically touch, measure, or direct the actual HTML element on the screen, use a ref.
ID: 1775666045829


Q: good rule of thumb for using `transition` vs keyframes
A: A rule of thumb that can help you decide when to use CSS transitions vs keyframe animations is that CSS transitions are great for interactions, while keyframe animations are better for staged sequences that run once.
ID: 1775666045834


Q: can u use motion values inside of reg divs/elements or do u need it to be a motion div? and what prop are the motion values accepted into?
A: Motion components accept motion values directly in their `style` prop.
ID: 1775666045839


Q: `useSpring` returns what in Motion and how does it do it?
A: `useSpring` returns a special motion value where **any time the value changes, it moves there using spring physics** instead of jumping instantly.
ID: 1775666045845


Q: blank and blank are Motion event handlers that handle when the user starts and stop dragging a thing
A: `onPanStart` and `onPanEnd` are event handlers built into Framer Motion that fire when the user starts and stops dragging the element.
ID: 1775666045852


Q: what does Motion automatically map to translateY under the hood?
A: when you pass in `style={{ y }} ` into a motion.div 
ID: 1775666045858


Q: true or false: `transform: translateY(100px)` is purely visual, doesn't effect layout
A: true
ID: 1775666045866

Q: what does border-box sizing count and not count?
A: counts padding and borders but not margin

Q: purpose of `layout`prop in Motion?
A: "When this element's box (position or size) changes between renders, animate from old to new instead of snapping."

Q: what motion prop to use if you need a single element to animate size / position?
A: layout

Q: what if an element needs mount/unmount animations, what motion props to use?
A: `AnimatePresence` + `initial/exit`

Q: what if you need element's siblings to smoothly slide when one is added/removed, what motion props to use?
A: use `AnimatePresence` + `layout` on the items + (usually) `popLayout`

Q: what if you need a parent's `layout` measurement to be correct when an `AnimatePresence` child is exiting?
A: `mode=popLayout`


Q: how does the `layout` prop work technically in Motion?
A: Motion calls getBoundingClientRect() before and after each render. The layout prop says "if those two rects differ, animate between them via transform."

Q: `layout="xxx" all xxx options in Motion
A: `position`, `size` , `preserve-aspect` (animates size and keeps aspect ratio)

Q: what if you do `layout` for an automatic animation but you don't like how it looks? how would you manually override the automatic transition?
A: add `transition` prop to the motion element like: `transition={{ layout: { duration: 0.6, ease: "easeOut" } }}`

Q: What is the exact order of the browser rendering pipeline?
A: Style, Layout, Paint, Composite.

Q: Which phase of the rendering pipeline is the most computationally expensive because it calculates positions, sizes, and line breaks?
A: Layout.

Q: What is the severe performance problem caused by continuously alternating between DOM reads and DOM writes?
A: Layout thrashing.

Q: mental model of `clamp(min, preferred, max)` and vw?
A: draws a line from your min to your max, and the `vw` part controls how steep that line is. `4vw` means "for every 100px of viewport width, add 4px."

Q: `onClick` vs `onPointerDown` 
A: onClick is for after click and release, onPointerDown is just for when the pointer goes down (mainly used for dragging interactions)
