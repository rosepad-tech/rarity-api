

#/bash/sh



ipfsHash=$1 #QmQpFpmyXwcJkU2dKmzemtjNLqYQw9XwQjqp4hUY8xU8Xx
#ipfs ls $1 | awk '{print $1}'
total=0
line=0
newline="\n"
#echo "NFT ID,Token Number,background,baseape,baseclothes,earrings,eyes,headwear,mouth,roses,necklace,crypto" >> ForMedian.csv
for i in {1777..1800}
do
    
    score=$(curl -X GET "https://rarity-api.roseape.io/metadata-traits/"$i -H "accept: application/json" | jq '.totalRarityScore, .traitRarityScores.background, .traitRarityScores.baseape, .traitRarityScores.baseclothes, .traitRarityScores.earrings, .traitRarityScores.eyes, .traitRarityScores.headwear , .traitRarityScores.mouth, .traitRarityScores.roses , .traitRarityScores.necklace,  .traitRarityScores.crypto')


    #"traitRarityScores":{"background":9.23076923076923,"baseape":5.921052631578947,"baseclothes":9.473684210526315,
    # "earrings":10.714285714285714,"eyes":11.11111111111111,"headwear":10.227272727272727,"mouth":14.516129032258064,
    # "roses":10.465116279069766,"necklace":10.344827586206897,"crypto":9.67741935483871},"totalRarityScore":101.68166787791749}

    total=$(echo $total + $score | bc )
    
    #echo "Total: $total"
    
    #echo "For Median: $forMedian"
    
    echo $i,$score >> ForMedian.csv
done


#echo $line > ForMedian.csv
average=$(($total/1800))

echo "Average: $average"


