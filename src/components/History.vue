<template>
  <div id="graph">
  <div class="bitcoin-price">
    <svg style="width:0; height:0; position:absolute;" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="btcFill" x1="1" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#f69119"></stop>
          <stop offset="100%" stop-color="#ffffff"></stop>
        </linearGradient>
      </defs>
    </svg>
    <TrendChart v-if="dataset.length" :datasets="[{data: dataset, fill: true, className: 'curve-btc'}]" :labels="labels" :min="0" :grid="grid" />
  </div>
  <p id="dates">{{fdate}}</p>
</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import TrendChart from "vue-trend-chart";
Vue.use(TrendChart);

export default {
    name: "History",

    props: {
        date: {
            type: String,
            required: false,
            default: 'today'
        }
    },

    data() {
        return {
            dateStart: "",
            dateEnd: "",
            dataset: [],
            labels: {
            xLabels: [],
            yLabels: 5,
            yLabelsTextFormatter: val => Math.round(val * 100) / 100
            },
            grid: {
            verticalLines: true,
            verticalLinesNumber: 1,
            horizontalLines: true,
            horizontalLinesNumber: 1
            }
        }
    },

    computed: {
      // get only, just need a function
      fdate: function () {
        return 'From ' + new Date(this.dateStart).toLocaleDateString('es-ES') + " to " + new Date(this.dateEnd).toLocaleDateString('es-ES')
      }
    },

    mounted() {
    axios
      .get("/test.json")
      .then(res => {
        console.log(res.data)
        this.dateStart = res.data.start_time
         this.dateEnd = res.data.end_time
        const data = res.data.data;
        for (let key in data) {
          this.dataset.push(data[key]);
          //this.labels.xLabels.push(moment(key).format("MM/DD"));
        }
      });
    },

    methods: {
        readNews(newsNum){
            this.$emit('read', newsNum);
        }
    }
}
</script>


 <style>
 * {
  box-sizing: border-box;
}



#graph {
  margin: 0 auto;
  padding: 10px;
  max-width: 600px;
}


   .bitcoin-price .vtc {
    height: 250px;
    font-size: 12px;
    @media (min-width: 699px) {
      height: 350px;
    }
  }
   .labels line {
     
      stroke: rgba(#f69119, 0.5);
    }

    .labels text {
      font-size: 9px;
      font-weight: normal;
    }

    .curve-btc .stroke {
      stroke: #f69119;
      stroke-width: 2;
    }
    .curve-btc .fill {
      fill: url(#btcFill);
      fill-opacity: 0.5;
    }

    #dates {
       font-size: 12px;
      font-weight: normal;
    }


/*
  .x-labels {
    .label {
      text {
        display: none;
      }
      line {
        opacity: 0.3;
      }
      &:nth-child(6n + 1),
      &:first-child {
        text {
          display: block;
        }
        line {
          opacity: 1;
        }
      }
    }
  }
  
}
*/
 </style>