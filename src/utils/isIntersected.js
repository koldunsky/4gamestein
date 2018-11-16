/**
 * Detects if two elements are colliding
 *
 * Credit goes to BC on Stack Overflow, cleaned up a little bit
 *
 * @link http://stackoverflow.com/questions/5419134/how-to-detect-if-two-divs-touch-with-jquery
 * @param parent {Object} {x, y, width, height}
 * @param child  {Object} {x, y, width, height}
 * @returns {boolean}
 */
export default function(parent, child) {
  // Div 1 data
  const parentX = parent.x;
  const parentY = parent.y;
  const parent_distance_from_top  = parentY + parent.height;
  const parent_distance_from_left = parentX + parent.width;

  // Div 2 data
  const childX = parent.x + child.x - ((child.scaleX-1) * child.width);
  const childY = parent.y + child.y - ((child.scaleY-1) * child.height);

  const  child_height             = child.height * child.scaleY;
  const  child_width              = child.width * child.scaleX;
  const  child_distance_from_top  = childY + child_height;
  const  child_distance_from_left = childX + child_width;

  const  not_colliding = ( parent_distance_from_top < childY || parentY > child_distance_from_top || parent_distance_from_left < childX || parentX > child_distance_from_left );

  // console.info('parent', parent);
  // console.info('child', childY, child_distance_from_left);
  // //
  // console.info('parent_distance_from_top < childY', parent_distance_from_top < childY);
  // console.info('parentY > child_distance_from_top', parentY > child_distance_from_top);
  // console.info('parent_distance_from_left < childX', parent_distance_from_left < childX);
  // console.info('parentX > child_distance_from_left', parentX > child_distance_from_left);
  // Return whether it IS colliding
  return ! not_colliding;
};

/**
 * Detects if two elements are colliding
 *
 * Credit goes to BC on Stack Overflow, cleaned up a little bit
 *
 * @link http://stackoverflow.com/questions/5419134/how-to-detect-if-two-divs-touch-with-jquery
 * @param parent {Object} {x, y, width, height}
 * @param child  {Object} {x, y, width, height}
 * @returns {boolean}
 */
export function isIntersectedForNonSmokers(parent, child) {
  // Div 1 data
  const parentX = parent.x;
  const parentY = parent.y;
  const parent_distance_from_top  = parentY + parent.height;
  const parent_distance_from_left = parentX + parent.width;

  // Div 2 data
  const childX = child.x;
  const childY = child.y;

  const  child_height             = child.height ;
  const  child_width              = child.width;
  const  child_distance_from_top  = childY + child_height;
  const  child_distance_from_left = childX + child_width;

  const  not_colliding = ( parent_distance_from_top < childY || parentY > child_distance_from_top || parent_distance_from_left < childX || parentX > child_distance_from_left );

  // console.info('parent', parent_distance_from_top);
  // console.info('child', childY);
  // //
  // console.info('parent_distance_from_top < childY', parent_distance_from_top < childY);
  // console.info('parentY > child_distance_from_top', parentY > child_distance_from_top);
  // console.info('parent_distance_from_left < childX', parent_distance_from_left < childX);
  // console.info('parentX > child_distance_from_left', parentX > child_distance_from_left);
  // Return whether it IS colliding
  return ! not_colliding;
}