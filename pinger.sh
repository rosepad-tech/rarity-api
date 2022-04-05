

#/bash/sh



ipfsHash=$1 #QmQpFpmyXwcJkU2dKmzemtjNLqYQw9XwQjqp4hUY8xU8Xx
#ipfs ls $1 | awk '{print $1}'
total=0
forMedian=0
for i in {0..1800}
do
    
    tokenNumber=$(curl -X GET "https://rarity-api.roseape.io/metadata-traits/"$i -H "accept: application/json" | jq '.totalRarityScore')
    total=$(echo $total + $tokenNumber | bc )
    echo "Token Number: $tokenNumber"
    echo "Total: $total"
    forMedian=$(echo $tokenNumber,$forMedian,)
    echo "For Median: $forMedian"
    echo "At: $i"
done


echo $forMedian > ForMedian.csv
average=$(($total/1800))

echo "Average: $average"


