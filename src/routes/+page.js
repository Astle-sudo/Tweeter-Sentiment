export async function load({ params, fetch }) {
    try {
      const response1 = await fetch('/similar.json');
      const response2 = await fetch('/output.json');
      const data1 = await response1.json();
      const data2 = await response2.json();
      return {
        props: {
          weightsIndex: data1,
          weightsArray: data2
        }
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        status: 500,
        error: new Error('Failed to fetch data')
      };
    }
  }