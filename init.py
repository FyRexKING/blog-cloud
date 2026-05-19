import heapq
def man(x1,y1,x2,y2):
    return abs(x1-x2)+abs(y1-y2)
def isv(x,y,grid):
    return (
        0<=x<len(grid)
        and 0<=y<len(grid[0])
        and grid[x][y]==0
    )
def print_path(parent,goal):
    path=[]
    current=goal
    while current!=parent[current]:
        path.append(current)
        current=parent[current]
    path.append(current)
    path.reverse()
    print("Optimal Path:")
    for node in path:
        print(node,end=" ")
    print()
def a_star(grid,start,goal):
    pq=[]
    heapq.heappush(pq,(0,start))
    visited=set()
    g={start:0}
    parent={}
    parent[start]=start
    dir=[
        (-1,0),
        (1,0),
        (0,-1),
        (0,1)
    ]
    while pq:
        f,current=heapq.heappop(pq)
        if current in visited:
            continue
        visited.add(current)
        if current==goal:
            print_path(parent,goal)
            print("Total Cost:",g[goal])
            return
        x,y=current
        for dx,dy in dir:
            nx,ny=x+dx,y+dy
            if isv(nx,ny,grid):
                new_g=g[current]+1
                if (nx,ny) not in g or new_g<g[(nx,ny)]:
                    g[(nx,ny)]=new_g
                    h=man(
                        nx,
                        ny,
                        goal[0],
                        goal[1]
                    )
                    f=new_g+h
                    heapq.heappush(
                        pq,
                        (f,(nx,ny))
                    )
                    parent[(nx,ny)]=current
    print("No path found")
def main():
    grid=[
        [0,0,0,0,0],
        [1,1,0,1,0],
        [0,0,0,1,0],
        [0,1,1,0,0],
        [0,0,0,0,0]
    ]
    start=(0,0)
    goal=(2,2)
    a_star(grid,start,goal)
  
if __name__ == '__main__':
    main()

n=int(input())
graph=[list(map(int,input().split())) for i in range(n)]
visited=[False]*n
visited[0]=True
cost=0
for _ in range(n-1):
    minm=9999
    x,y=0,0
    for i in range(n):
        if visited[i]:
            for j in range(n):
                if not visited[j] and graph[i][j] and graph[i][j]<minm:
                    minm=graph[i][j]
                    x,y=i,j

    visited[y]=True
    cost+=minm
    print(x,y,minm)
print("Total Cost:",cost)



n=9
board=[[0]*n for i in range(n)]
def is_safe(row,col):
    for i in range(col):
        if board[row][i]==1:
            return False
    i=row
    j=col
    while i>=0 and j>=0:
        if board[i][j]==1:
            return False
        i-=1
        j-=1
    i=row
    j=col
    while i<n and j>=0:
        if board[i][j]==1:
            return False
        i+=1
        j-=1
    return True
def solve(col):
    if col>=n:
        return True
    for i in range(n):
        if is_safe(i,col):
            board[i][col]=1
            if solve(col+1):
                return True
            board[i][col]=0
    return False
def print_board():
    for row in board:
        for col in row:
            if col==1:
                print("Q",end=" ")
            else:
                print(".",end=" ")
        print()
if solve(0):
    print_board()
else:
    print("No solution found")
