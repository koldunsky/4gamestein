import _set from 'lodash/set';
import _get from 'lodash/get';

export default () => {
  const mediaCollection = {};
  //
  function importAllAssets (r) {
    r.keys().forEach((key) => {
      const ext = key.split('/')[1]; // Extension
      const cat = key.split('/')[2].split('.')[0]; // Category
      const pathInObject = `${ext}.${cat}`;
      const filePath = r(key);

      const category = _get(mediaCollection, pathInObject, []);
      category.push({
        preview: filePath,
        image: filePath,
      });
      _set(mediaCollection, pathInObject, category);
    });
  }

  importAllAssets(require.context('../editorAssets/', true, /\.webp$/));
  importAllAssets(require.context('../editorAssets/', true, /\.png$/));

  return mediaCollection;
}
