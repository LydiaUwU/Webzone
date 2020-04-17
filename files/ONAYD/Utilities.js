// General Utilities
// Author: Lydia Macbride, https://lydia.ng.netsoc.ie

function collides(p1, s1, p2, s2) {
    return p1.x >= p2.x && p1.x + s1.x <= p2.x + s2.x && p1.y >= p2.y && p1.y + s1.y <= p2.y + s2.y
}