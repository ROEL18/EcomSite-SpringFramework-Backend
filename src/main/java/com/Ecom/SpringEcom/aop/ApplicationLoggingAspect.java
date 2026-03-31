package com.Ecom.SpringEcom.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
public class ApplicationLoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger(ApplicationLoggingAspect.class);

    @Before("execution(* com.Ecom.SpringEcom.controller..*(..))")
    public void logBeforeController(JoinPoint joinPoint) {
        logger.info("Controller call: {} with args {}",
                joinPoint.getSignature().toShortString(),
                Arrays.toString(joinPoint.getArgs()));
    }

    @Around("execution(* com.Ecom.SpringEcom.service..*(..))")
    public Object logAroundService(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        try {
            Object result = joinPoint.proceed();
            long executionTime = System.currentTimeMillis() - startTime;
            logger.info("Service call: {} completed in {} ms",
                    joinPoint.getSignature().toShortString(),
                    executionTime);
            return result;
        } catch (Throwable ex) {
            long executionTime = System.currentTimeMillis() - startTime;
            logger.error("Service call: {} failed in {} ms with message: {}",
                    joinPoint.getSignature().toShortString(),
                    executionTime,
                    ex.getMessage());
            throw ex;
        }
    }

    @AfterThrowing(pointcut = "execution(* com.Ecom.SpringEcom..*(..))", throwing = "ex")
    public void logAfterThrowing(JoinPoint joinPoint, Throwable ex) {
        logger.error("Exception in {}.{}() with cause = {}",
                joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName(),
                ex.getMessage());
    }
}
