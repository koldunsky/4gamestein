/**
 * Detects if two elements are colliding
 *
 * Credit goes to BC on Stack Overflow, cleaned up a little bit
 *
 * @link http://stackoverflow.com/questions/5419134/how-to-detect-if-two-divs-touch-with-jquery
 * @param parent {x, y, width, height}
 * @param child {x, y, width, height}
 * @param parentOffset {x, y}
 * @returns {boolean}
 */
export default function( parent, child, parentOffset = 0) {

  // Div 1 data
  const parent_height             = parent.height;
  const parent_width              = parent.width;
  const parent_distance_from_top  = parent.y + parent_height;
  const parent_distance_from_left = parent.x + parent_width;

  // Div 2 data
  const childX = parentOffset.x + child.x - ((child.scaleX-1) * child.width);
  const childY = parentOffset.y + child.y - ((child.scaleY-1) * child.height);

  const  child_height             = child.height * child.scaleY;
  const  child_width              = child.width * child.scaleX;
  const  child_distance_from_top  = childY + child_height;
  const  child_distance_from_left = childX + child_width;

  const  not_colliding = ( parent_distance_from_top < childY || parent.y > child_distance_from_top || parent_distance_from_left < childX || parent.x > child_distance_from_left );

  console.info('parent', parent_distance_from_left);
  console.info('child', childX);

  console.info('parent_distance_from_top < childY', parent_distance_from_top < childY);
  console.info('parent.y > child_distance_from_top', parent.y > child_distance_from_top);
  console.info('parent_distance_from_left < childX', parent_distance_from_left < childX);
  console.info('parent.x > child_distance_from_left', parent.x > child_distance_from_left);
  // Return whether it IS colliding
  return ! not_colliding;
};