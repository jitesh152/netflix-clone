
export function stringToSlug ( string = '' ) {
  string = string.replace(/^\s+|\s+$/g, '').toLowerCase();

  // remove accents, swap ñ for n, etc
  let from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  let to   = "aaaaeeeeiiiioooouuuunc------";
  for (let i = 0, l = from.length; i < l; i++) {
    string = string.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  string = string.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes

  return string;
}

export const formatDate = ( inputDate, options = { day: '2-digit', month: 'short', year: 'numeric' } ) => {
  if( inputDate === '' ) return;
  const date = new Date( inputDate );
  return date.toLocaleDateString('en-US', options);
}

export const changePageTitle = ( title ) => {
  document.title = title + ' - Netflix Clone';
}
export const formatTimeFromMinutes = (minutes) => {
  if (minutes < 0) {
    return minutes;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}H ${remainingMinutes}M`;
}

export const getYouTubeThumbnail = ( videoId = '' ) => {
  if( videoId == '' ) return;
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

export const scrollToTop = ( x = 0, y = 0) => {
  window.scrollTo(x, y);
};

export const groupByYear = (array) => {
  if( array.length < 1 ) return;
  const grouped = array.reduce((result, item) => {
    const year = new Date(item.release_date).getFullYear();
    
    if (!result[year]) {
      result[year] = [];
    }
    
    result[year].push(item);
    
    return result;
  }, {});

  return grouped;
};