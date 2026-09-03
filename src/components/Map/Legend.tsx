const legendIconSize = 22;
const rectHeight = 4;
export default function Legend() {
  return (
    <div className="mt-2 absolute right-2 bottom-6 p-4 z-10 bg-white shadow rounded-md text-[1rem] flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <svg width={legendIconSize} height={legendIconSize}>
          <circle
            cx={legendIconSize / 2}
            cy={legendIconSize / 2}
            r={legendIconSize / 2}
            fill="#d53e4f"
          />
        </svg>
        <span>Permanent Bike / Ped Counter</span>
      </div>
      <span className="font-bold"> Circuit Trails</span>
      <div className="grid grid-cols-2">
        <div className="flex items-center gap-2">
          <svg width={legendIconSize} height={rectHeight}>
            <rect
              x={0}
              y={0}
              width={legendIconSize}
              height={rectHeight}
              fill="#8EC73D"
            />
          </svg>
          <span>Existing</span>
        </div>
        <div className="flex items-center gap-2">
          <svg width={legendIconSize} height={rectHeight}>
            <rect
              x={0}
              y={0}
              width={legendIconSize}
              height={rectHeight}
              fill="#FDAE61"
            />
          </svg>
          <span>In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <svg width={legendIconSize} height={rectHeight}>
            <rect
              x={0}
              y={0}
              width={legendIconSize}
              height={rectHeight}
              fill="#B144A5"
            />
          </svg>
          <span>Pipeline</span>
        </div>
        <div className="flex items-center gap-2">
          <svg width={legendIconSize} height={rectHeight}>
            <rect
              x={0}
              y={0}
              width={legendIconSize}
              height={rectHeight}
              fill="#2E9BA8"
            />
          </svg>
          <span>Planned</span>
        </div>
      </div>
    </div>
  );
}
