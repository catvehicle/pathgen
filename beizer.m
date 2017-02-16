P = [2,4; 5,7; 3,8; 6,9; 8,12; 10,15; 11, 18; 14, 7; 16, 21; 34, 32; 34, 53; 45, 67; 44, 10];
figure;
plot(P(:,1), P(:,2));
hold on;

for i = 1:2:length(P)-2
    if(i>=3)
        lastSlope = ( P(i,2) - P(i-1,2) ) / ( P(i,1) - P(i-1,1) );
        currentSlope = ( P(i+1,2) - P(i,2) ) / ( P(i+1,1) - P(i,1) );
        
        tan1 = atan(lastSlope)
        tan2 = atan(currentSlope)
        
      %  if( (abs(tan1 - tan2) > 1.0472 ) || lastSlope*currentSlope <= 0)
            P(i,:) = (P(i+1,:) + P(i-1,:))/2;
            plot(P(i,1), P(i,2),'g*');
       % end
    end
end

for i = 1:2:length(P)-2
    D = [];
    for t = 0:0.01:1
      C = P(i,:).*(1-t).*(1-t) + P(i+1,:).*2.*(1-t).*t + P(i+2,:).*t.*t;
      D = [D;C];
    end
    plot(D(:,1), D(:,2),'r')
end


% D = [];
% for t = 0:0.01:1
%   C = P(3,:).*(1-t).*(1-t) + P(4,:).*2.*(1-t).*t + P(5,:).*t.*t;
%   D = [D;C];
% end
% plot(D(:,1), D(:,2),'g')
% 
% 
% D = [];
% for t = 0:0.01:1
%   C = P(5,:).*(1-t).*(1-t) + P(6,:).*2.*(1-t).*t + P(7,:).*t.*t;
%   D = [D;C];
% end
% plot(D(:,1), D(:,2),'m')
% 
% D = [];
% for t = 0:0.01:1
%   C = P(7,:).*(1-t).*(1-t) + P(8,:).*2.*(1-t).*t + P(9,:).*t.*t;
%   D = [D;C];
% end
% plot(D(:,1), D(:,2),'r')
