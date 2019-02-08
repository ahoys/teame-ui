# Contexts
React Context API contexts.

Context provides a way to pass data through the component tree without having to pass props down manually at every level.

[Read more](https://reactjs.org/docs/context.html)

---

## Session
Contains all information about the current session (if any).
- Username
- Token

To find out whether the client has signed in, you can just check whether the token is **not** empty ("").

---

## Theme
The main theme definitions that should be used as widely as possible to achieve an unified theme.

The current theme, let's call it TeameTheme, has three base colors, making it a triadic color scheme:

### Primary color (60%)
The main branding color. Most of the site's coloring should be done with this color (about 60%).

### Secondary color (30%)
Creates contrast and visual interest. Used to guide user's attention.

### Accent color (10%)
For small details.

### Shades & tints

There are also a neccessary amount of shades and tints of the triadic colors to separate elements from each other.

---
## Learn more
[Basic color schemes](http://www.tigercolor.com/color-lab/color-theory/color-theory-intro.htm)