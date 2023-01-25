import cohere from 'cohere-ai';

cohere.init(process.env.COHERE_API_KEY ?? '');

export async function getScriptIndex(title: string) {
  const response = await cohere.generate({
    model: 'xlarge',
    prompt: generatePrompt(title),
    max_tokens: 400,
    temperature: 1,
    k: 0,
    p: 0.75,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: ["--"],
    return_likelihoods: 'NONE'
  });

  return response;
}


function generatePrompt(title: string): string {
  return `
  This program will generate an index with 10 points for the script of a youtube video given a title.
  --
  Video Title: History of Chocolate
  Index:
  1. The origins of chocolate in Mesoamerican cultures.
  2. The arrival of chocolate in Europe and its popularity among royalty.
  3. The industrial revolution and mass production of chocolate.
  4. The role of cocoa plantations and colonialism in the chocolate industry.
  5. The development of milk chocolate and white chocolate.
  6. The impact of World War II on chocolate production and rationing.
  7. The rise of artisanal and craft chocolate makers.
  8. The use of chocolate in confectionery and desserts.
  9. The health benefits and potential downsides of consuming chocolate.
  10. The future of the chocolate industry, including trends in sustainable and ethical
  --
  Video Title: Evolution of the Internet
  Index:
  1. The early days of the internet, including the creation of ARPANET.
  2. The development of the World Wide Web and the first web browsers.
  3. The rise of e-commerce and online shopping.
  4. The growth of social media and the impact on communication and connection.
  5. The role of search engines in making the internet more accessible.
  6. The growth of mobile internet and the rise of smartphones.
  7. The impact of the internet on traditional media and journalism.
  8. The role of the internet in the rise of the gig economy.
  9. The impact of internet censorship and government control.
  10. The future of the internet, including the potential impact of new technologies like 5G and blockchain.
  --
  Video Title: The Science of Sleep
  Index:
  1. The importance of sleep for physical and mental health.
  2. The stages of sleep and the role of REM sleep.
  3. The causes of insomnia and other sleep disorders.
  4. The effects of sleep deprivation and chronic sleep loss.
  5. The impact of lifestyle factors on sleep, such as diet and exercise.
  6. The use of sleep aids and medications to improve sleep.
  7. The role of the circadian rhythm in regulating sleep.
  8. The impact of shift work and jet lag on sleep.
  9. The potential effects of technology on sleep, including the impact of blue light.
  10. The future of sleep research and potential treatments for sleep disorders.
  --
  Video Title: ${title}
  Index:`
}

